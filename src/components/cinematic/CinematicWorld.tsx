import { useEffect, useRef, useState } from 'react';

type V = [number, number, number];
const SEGMENTS = 72;
const VERTS = SEGMENTS * 2;

function pushLine(out:number[], a:V, b:V){ out.push(...a,...b); }
function ring(out:number[], r:number, z:number, tilt:number, count=18){
  for(let i=0;i<count;i++){
    const a=i/count*Math.PI*2, b=(i+1)/count*Math.PI*2;
    pushLine(out,
      [Math.cos(a)*r, Math.sin(a)*r*Math.cos(tilt), z+Math.sin(a)*Math.sin(tilt)*r],
      [Math.cos(b)*r, Math.sin(b)*r*Math.cos(tilt), z+Math.sin(b)*Math.sin(tilt)*r]
    );
  }
}
function frame(out:number[], w:number,h:number,z:number,x=0,y=0){
  const a:V=[x-w,y-h,z],b:V=[x+w,y-h,z],c:V=[x+w,y+h,z],d:V=[x-w,y+h,z];
  pushLine(out,a,b);pushLine(out,b,c);pushLine(out,c,d);pushLine(out,d,a);
}
function path(out:number[], points:V[]){
  for(let i=0;i<points.length-1;i++) pushLine(out,points[i],points[i+1]);
}
function pad(input:number[]){
  const target=VERTS*3;
  while(input.length<target) input.push(0,0,-24,0,0,-24);
  return new Float32Array(input.slice(0,target));
}

function pattern(scene:number){
  const o:number[]=[];
  switch(scene){
    case 0:
      ring(o,2.7,-5.5,.65,20);ring(o,3.8,-8,-.42,20);frame(o,2.6,3.3,-5.2);frame(o,3.25,4,-8.4);
      break;
    case 1:
      for(let i=0;i<4;i++){const y=-2.4+i*1.6;pushLine(o,[-4,y,-8],[4,y,-8]);pushLine(o,[0,0,-4],[-3.4+i*2.2,y,-8]);}
      ring(o,2.3,-9,.1,16);
      break;
    case 2:
      for(let i=0;i<9;i++){const a=(i/9)*Math.PI*2;pushLine(o,[0,0,-4],[Math.cos(a)*3.8,Math.sin(a)*2.6,-8-i*.35]);}
      ring(o,3.1,-9,.25,20);
      break;
    case 3:
      for(let i=0;i<4;i++){const x=-2.7+i*1.8;path(o,[[0,0,-3],[x,-1.8+i*1.2,-6],[x*.7,1.8-i*.8,-10]]);}
      frame(o,3.7,2.6,-11);
      break;
    case 4:
      for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const p:V=[Math.cos(a)*3.5,Math.sin(a)*2.5,-7-(i%3)];pushLine(o,[0,0,-4],p);if(i>0){const ap=(i-1)/12*Math.PI*2;pushLine(o,[Math.cos(ap)*3.5,Math.sin(ap)*2.5,-7-((i-1)%3)],p);}}
      break;
    case 5:
      for(let i=0;i<5;i++){frame(o,2.4+i*.35,1.6+i*.22,-4-i*2.1,(i%2?-.35:.35),0);}
      path(o,[[-3,-2,-4],[-2,-1,-6],[-1,.2,-8],[.4,.8,-10],[2,1.2,-12]]);
      break;
    case 6:
      path(o,[[-4,2,-4],[-2,-1,-5],[-1.2,1.4,-6.5],[0,0,-8],[1.4,0,-9.5],[2.4,0,-11],[3.5,0,-12.5]]);
      for(let i=0;i<7;i++) pushLine(o,[-3.4+i*1.1,-.18,-13],[-3.4+i*1.1,.18,-13]);
      break;
    case 7:
      path(o,[[-3,-2.2,-4],[-2.2,-1.2,-5.5],[-1.4,-.4,-7],[-.4,.5,-8.5],[.8,1.2,-10],[2,1.8,-11.5],[3,2.5,-13]]);
      for(let i=0;i<7;i++){const x=-3+i;pushLine(o,[x,-2.7,-13],[x,-2.2+i*.75,-4-i*1.5]);}
      break;
    case 8:
      for(let i=0;i<6;i++){const z=-4-i*1.7;pushLine(o,[-2.8,-2+i*.65,z],[2.8,-2+i*.65,z]);}
      pushLine(o,[-2.8,-2,-4],[-2.8,1.3,-12.5]);pushLine(o,[2.8,-2,-4],[2.8,1.3,-12.5]);
      break;
    case 9:
      for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const r=2.2+(i%2)*1.2;pushLine(o,[0,0,-5],[Math.cos(a)*r,Math.sin(a)*r,-8]);}
      ring(o,3.7,-9,.1,24);
      break;
    case 10:
      for(let i=0;i<6;i++){const x=-3+i*1.2;pushLine(o,[x,-2,-5],[x,2,-5-i]);pushLine(o,[x,2,-5-i],[x+.8,2,-6-i]);}
      for(let y=-1;y<=1;y++) pushLine(o,[-4,y,-10],[4,y,-10]);
      break;
    case 11:
      for(let i=0;i<10;i++){const a=(-.9+i*.2);pushLine(o,[0,0,-4],[Math.sin(a)*5,Math.cos(a)*3,-12]);}
      break;
    default:
      for(let i=0;i<10;i++){const a=i/10*Math.PI*2;pushLine(o,[Math.cos(a)*3.8,Math.sin(a)*2.6,-5-i*.3],[0,0,-11]);}
      pushLine(o,[0,0,-3],[0,0,-13]);
  }
  return pad(o);
}

function shader(gl:WebGLRenderingContext,type:number,src:string){
  const s=gl.createShader(type);if(!s)throw new Error('shader');
  gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)||'compile');
  return s;
}
function makeProgram(gl:WebGLRenderingContext){
  const vs=shader(gl,gl.VERTEX_SHADER,`
    attribute vec3 aFrom;attribute vec3 aTo;
    uniform float uMix;uniform float uAspect;uniform float uTime;uniform float uLocal;uniform vec2 uPointer;
    varying float vDepth;
    mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,s,0.,1.,0.,-s,0.,c);}
    mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,-s,0.,s,c);}
    void main(){
      vec3 p=mix(aFrom,aTo,uMix);
      p.z += (uLocal-.5)*1.15;
      p=ry(uPointer.x*.12+sin(uTime*.18)*.015)*rx(-uPointer.y*.09)*p;
      float d=max(1.8,-p.z);
      vec2 q=(p.xy/d)*2.35;q.x/=max(.75,uAspect);
      gl_Position=vec4(q,0.,1.);
      vDepth=smoothstep(15.,3.,d);
    }`);
  const fs=shader(gl,gl.FRAGMENT_SHADER,`
    precision mediump float;varying float vDepth;
    void main(){vec3 a=vec3(.16,.33,.42),b=vec3(.18,.83,.75);vec3 c=mix(a,b,vDepth);gl_FragColor=vec4(c,.08+vDepth*.32);}
  `);
  const p=gl.createProgram();if(!p)throw new Error('program');
  gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);gl.deleteShader(vs);gl.deleteShader(fs);return p;
}

export default function CinematicWorld(){
  const ref=useRef<HTMLCanvasElement>(null);
  const [supported,setSupported]=useState(true);

  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,powerPreference:'low-power'});
    if(!gl){setSupported(false);return;}
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let program:WebGLProgram|null=null,fromBuffer:WebGLBuffer|null=null,toBuffer:WebGLBuffer|null=null,raf=0,dead=false;
    let current=0,next=0,mix=1,local=.5,px=0,py=0,tx=0,ty=0,last=performance.now();

    try{
      program=makeProgram(gl);fromBuffer=gl.createBuffer();toBuffer=gl.createBuffer();
      if(!fromBuffer||!toBuffer)throw new Error('buffer');
      gl.useProgram(program);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

      const aFrom=gl.getAttribLocation(program,'aFrom'),aTo=gl.getAttribLocation(program,'aTo');
      const uMix=gl.getUniformLocation(program,'uMix'),uAspect=gl.getUniformLocation(program,'uAspect'),uTime=gl.getUniformLocation(program,'uTime'),uLocal=gl.getUniformLocation(program,'uLocal'),uPointer=gl.getUniformLocation(program,'uPointer');

      const upload=()=>{
        gl.bindBuffer(gl.ARRAY_BUFFER,fromBuffer);gl.bufferData(gl.ARRAY_BUFFER,pattern(current),gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aFrom);gl.vertexAttribPointer(aFrom,3,gl.FLOAT,false,0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER,toBuffer);gl.bufferData(gl.ARRAY_BUFFER,pattern(next),gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aTo);gl.vertexAttribPointer(aTo,3,gl.FLOAT,false,0,0);
      };
      upload();

      const resize=()=>{
        const dpr=Math.min(window.devicePixelRatio||1,1.25),w=Math.floor(innerWidth*dpr),h=Math.floor(innerHeight*dpr);
        if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
      };
      const updateScene=()=>{
        const scenes=Array.from(document.querySelectorAll<HTMLElement>('[data-cinematic-scene]'));
        const anchor=innerHeight*.5;let best=0,dist=Infinity,lp=.5;
        scenes.forEach((s,i)=>{const r=s.getBoundingClientRect();const inside=r.top<=anchor&&r.bottom>=anchor;const d=inside?0:Math.min(Math.abs(r.top-anchor),Math.abs(r.bottom-anchor));if(d<dist){dist=d;best=i;lp=Math.min(1,Math.max(0,(anchor-r.top)/Math.max(1,r.height)));}});
        local=lp;
        if(best!==next){current=next;next=best;mix=0;upload();}
      };
      const pointer=(e:PointerEvent)=>{if(e.pointerType==='touch')return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;};

      let scrollFrame=0;
      const queueScene=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateScene();});};
      const draw=(now:number)=>{
        if(dead||!program)return;
        const dt=Math.min(.05,(now-last)/1000);last=now;mix=Math.min(1,mix+dt*.9);
        px+=(tx-px)*.045;py+=(ty-py)*.045;
        gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);
        gl.uniform1f(uMix,reduce?1:mix);gl.uniform1f(uAspect,canvas.width/Math.max(1,canvas.height));gl.uniform1f(uTime,reduce?0:now/1000);gl.uniform1f(uLocal,local);gl.uniform2f(uPointer,reduce?0:px,reduce?0:py);
        gl.drawArrays(gl.LINES,0,VERTS);
        raf=requestAnimationFrame(draw);
      };

      resize();updateScene();
      addEventListener('resize',resize,{passive:true});addEventListener('scroll',queueScene,{passive:true});addEventListener('pointermove',pointer,{passive:true});
      raf=requestAnimationFrame(draw);
      return()=>{dead=true;cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('scroll',queueScene);removeEventListener('pointermove',pointer);if(fromBuffer)gl.deleteBuffer(fromBuffer);if(toBuffer)gl.deleteBuffer(toBuffer);if(program)gl.deleteProgram(program);};
    }catch(e){console.warn('[cinematic-world]',e);setSupported(false);}
  },[]);

  if(!supported)return <div className="cinematic-world-fallback" aria-hidden="true"/>;
  return <canvas ref={ref} className="cinematic-world" aria-hidden="true"/>;
}
