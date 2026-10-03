import { useEffect, useRef, useState } from 'react';

type Vec3 = [number, number, number];

function addLine(target: number[], a: Vec3, b: Vec3) {
  target.push(...a, ...b);
}

function ring(target: number[], radius: number, z: number, segments: number, tilt = 0) {
  for (let i = 0; i < segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    const b = ((i + 1) / segments) * Math.PI * 2;
    const pa: Vec3 = [Math.cos(a) * radius, Math.sin(a) * radius * Math.cos(tilt), z + Math.sin(a) * Math.sin(tilt) * radius];
    const pb: Vec3 = [Math.cos(b) * radius, Math.sin(b) * radius * Math.cos(tilt), z + Math.sin(b) * Math.sin(tilt) * radius];
    addLine(target, pa, pb);
  }
}

function frame(target: number[], w: number, h: number, z: number, x = 0, y = 0) {
  const a: Vec3 = [x - w, y - h, z];
  const b: Vec3 = [x + w, y - h, z];
  const c: Vec3 = [x + w, y + h, z];
  const d: Vec3 = [x - w, y + h, z];
  addLine(target, a, b); addLine(target, b, c); addLine(target, c, d); addLine(target, d, a);
}

function makeGeometry() {
  const v: number[] = [];
  ring(v, 2.8, -5.8, 72, .7);
  ring(v, 3.6, -7.8, 72, -.5);
  ring(v, 4.5, -10.2, 80, .2);

  frame(v, 2.7, 3.4, -5.2, .2, 0);
  frame(v, 3.1, 3.8, -7.2, -.25, .1);
  frame(v, 3.5, 4.2, -9.4, .35, -.15);

  const rails: Vec3[] = [
    [-2.7,-3.4,-5.2],[-3.1,-3.8,-7.2],[-3.5,-4.2,-9.4],
    [2.7,-3.4,-5.2],[3.1,-3.8,-7.2],[3.5,-4.2,-9.4],
    [-2.7,3.4,-5.2],[-3.1,3.8,-7.2],[-3.5,4.2,-9.4],
    [2.7,3.4,-5.2],[3.1,3.8,-7.2],[3.5,4.2,-9.4],
  ];
  for (let i=0;i<rails.length;i+=3) {
    addLine(v, rails[i], rails[i+1]);
    addLine(v, rails[i+1], rails[i+2]);
  }

  for (let i=0;i<14;i++) {
    const t=i/13;
    const x=-4.2+t*8.4;
    addLine(v,[x,-.03,-11.8],[x,.03,-11.8]);
  }

  return new Float32Array(v);
}

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const s = gl.createShader(type);
  if (!s) throw new Error('Unable to create shader');
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'Shader compile failed');
  return s;
}

function program(gl: WebGLRenderingContext) {
  const vs = shader(gl, gl.VERTEX_SHADER, `
    attribute vec3 aPosition;
    uniform float uAspect;
    uniform float uTime;
    uniform vec2 uPointer;
    varying float vDepth;

    mat3 rotX(float a){
      float c=cos(a), s=sin(a);
      return mat3(1.,0.,0., 0.,c,-s, 0.,s,c);
    }
    mat3 rotY(float a){
      float c=cos(a), s=sin(a);
      return mat3(c,0.,s, 0.,1.,0., -s,0.,c);
    }

    void main(){
      vec3 p=aPosition;
      float ry=uPointer.x*.22 + sin(uTime*.25)*.035;
      float rx=-uPointer.y*.16 + cos(uTime*.18)*.02;
      p = rotY(ry) * rotX(rx) * p;

      float d=max(1.6,-p.z);
      vec2 projected=(p.xy/d)*2.35;
      projected.x/=max(.75,uAspect);

      gl_Position=vec4(projected,0.,1.);
      vDepth=smoothstep(13.,3.,d);
    }
  `);

  const fs = shader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying float vDepth;
    void main(){
      vec3 nearCol=vec3(.18,.83,.75);
      vec3 farCol=vec3(.25,.42,.52);
      vec3 col=mix(farCol,nearCol,vDepth);
      gl_FragColor=vec4(col,.18 + vDepth*.46);
    }
  `);

  const p = gl.createProgram();
  if (!p) throw new Error('Unable to create program');
  gl.attachShader(p,vs); gl.attachShader(p,fs); gl.linkProgram(p);
  gl.deleteShader(vs); gl.deleteShader(fs);
  if (!gl.getProgramParameter(p,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'Program link failed');
  return p;
}

export default function Hero3DScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [supported,setSupported]=useState(true);

  useEffect(()=>{
    const canvas=ref.current;
    if(!canvas) return;
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:false,powerPreference:'low-power'});
    if(!gl){setSupported(false);return;}

    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let p:WebGLProgram|null=null;
    let buffer:WebGLBuffer|null=null;
    let raf=0;
    let disposed=false;
    let px=0,py=0,tx=0,ty=0;
    const geometry=makeGeometry();

    try{
      p=program(gl);
      buffer=gl.createBuffer();
      if(!buffer) throw new Error('Buffer failed');

      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,geometry,gl.STATIC_DRAW);
      gl.useProgram(p);

      const pos=gl.getAttribLocation(p,'aPosition');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

      const aspect=gl.getUniformLocation(p,'uAspect');
      const time=gl.getUniformLocation(p,'uTime');
      const pointer=gl.getUniformLocation(p,'uPointer');

      const resize=()=>{
        const dpr=Math.min(window.devicePixelRatio||1,1.4);
        const rect=canvas.getBoundingClientRect();
        const w=Math.max(1,Math.floor(rect.width*dpr));
        const h=Math.max(1,Math.floor(rect.height*dpr));
        if(canvas.width!==w||canvas.height!==h){
          canvas.width=w; canvas.height=h; gl.viewport(0,0,w,h);
        }
      };

      const move=(e:PointerEvent)=>{
        if(e.pointerType==='touch') return;
        const r=canvas.getBoundingClientRect();
        tx=(e.clientX-r.left)/Math.max(1,r.width)-.5;
        ty=(e.clientY-r.top)/Math.max(1,r.height)-.5;
      };

      const draw=(now:number)=>{
        if(disposed||!p) return;
        px+=(tx-px)*.055; py+=(ty-py)*.055;
        gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(p);
        gl.uniform1f(aspect,canvas.width/Math.max(1,canvas.height));
        gl.uniform1f(time,reduce?0:now/1000);
        gl.uniform2f(pointer,reduce?0:px,reduce?0:py);
        gl.drawArrays(gl.LINES,0,geometry.length/3);
        if(!reduce) raf=requestAnimationFrame(draw);
      };

      resize();
      window.addEventListener('resize',resize,{passive:true});
      canvas.addEventListener('pointermove',move,{passive:true});
      draw(0);

      return ()=>{
        disposed=true;
        cancelAnimationFrame(raf);
        window.removeEventListener('resize',resize);
        canvas.removeEventListener('pointermove',move);
        if(buffer) gl.deleteBuffer(buffer);
        if(p) gl.deleteProgram(p);
      };
    }catch(err){
      console.warn('[hero-3d]',err);
      setSupported(false);
      if(buffer) gl.deleteBuffer(buffer);
      if(p) gl.deleteProgram(p);
    }
  },[]);

  if(!supported) return <div className="hero-3d-fallback" aria-hidden="true" />;
  return <canvas ref={ref} className="hero-3d-canvas" aria-hidden="true" />;
}
