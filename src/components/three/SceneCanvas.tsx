import { useEffect, useRef, useState } from 'react';

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create WebGL shader.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Unknown shader error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, `
    attribute vec3 aPosition;
    uniform float uScroll;
    uniform float uAspect;
    uniform vec2 uPointer;
    varying float vFade;

    void main() {
      vec3 p = aPosition;
      p.z = mod(p.z + uScroll * 42.0 + 46.0, 46.0) - 46.0;
      float depth = max(1.7, -p.z);
      p.x += uPointer.x * (0.18 + depth * 0.012);
      p.y += uPointer.y * (0.12 + depth * 0.009);
      vec2 projected = (p.xy / depth) * 2.6;
      projected.x /= max(0.75, uAspect);
      gl_Position = vec4(projected, 0.0, 1.0);
      vFade = smoothstep(46.0, 5.0, depth) * smoothstep(1.7, 4.5, depth);
    }
  `);

  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying float vFade;
    void main() {
      gl_FragColor = vec4(0.176, 0.831, 0.749, 0.32 * vFade);
    }
  `);

  const program = gl.createProgram();
  if (!program) throw new Error('Unable to create WebGL program.');
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'Unknown link error.';
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function buildArchitecture(frameCount: number) {
  const vertices: number[] = [];
  const addLine = (a: [number, number, number], b: [number, number, number]) => {
    vertices.push(...a, ...b);
  };

  for (let i = 0; i < frameCount; i += 1) {
    const z = -4 - i * 3.4;
    const width = 3.7 + (i % 3) * 0.14;
    const height = 2.3 + ((i + 1) % 3) * 0.1;
    const left = -width;
    const right = width;
    const top = height;
    const bottom = -height;

    addLine([left, bottom, z], [right, bottom, z]);
    addLine([right, bottom, z], [right, top, z]);
    addLine([right, top, z], [left, top, z]);
    addLine([left, top, z], [left, bottom, z]);

    if (i < frameCount - 1) {
      const nextZ = z - 3.4;
      addLine([left, bottom, z], [left, bottom, nextZ]);
      addLine([right, bottom, z], [right, bottom, nextZ]);
      addLine([left, top, z], [left, top, nextZ]);
      addLine([right, top, z], [right, top, nextZ]);
    }

    if (i % 2 === 0) {
      addLine([-0.65, bottom, z], [-0.65, top, z]);
      addLine([0.65, bottom, z], [0.65, top, z]);
    }
  }

  return new Float32Array(vertices);
}

export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    });

    if (!gl) {
      setAvailable(false);
      return;
    }

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let frame = 0;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollProgress = 0;

    try {
      program = createProgram(gl);
      buffer = gl.createBuffer();
      if (!buffer) throw new Error('Unable to create geometry buffer.');

      const mobile = window.innerWidth < 768;
      const geometry = buildArchitecture(mobile ? 9 : 14);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, geometry, gl.STATIC_DRAW);

      gl.useProgram(program);
      const position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

      const scrollLocation = gl.getUniformLocation(program, 'uScroll');
      const aspectLocation = gl.getUniformLocation(program, 'uAspect');
      const pointerLocation = gl.getUniformLocation(program, 'uPointer');

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5);
        const width = Math.max(1, Math.floor(window.innerWidth * dpr));
        const height = Math.max(1, Math.floor(window.innerHeight * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          gl.viewport(0, 0, width, height);
        }
      };

      const updateScroll = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
      };

      const updatePointer = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        targetX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
        targetY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
      };

      const render = () => {
        if (disposed || !program) return;
        pointerX += (targetX - pointerX) * 0.035;
        pointerY += (targetY - pointerY) * 0.035;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform1f(scrollLocation, scrollProgress);
        gl.uniform1f(aspectLocation, canvas.width / Math.max(1, canvas.height));
        gl.uniform2f(pointerLocation, pointerX, -pointerY);
        gl.drawArrays(gl.LINES, 0, geometry.length / 3);

        if (!reducedMotion) frame = requestAnimationFrame(render);
      };

      resize();
      updateScroll();
      window.addEventListener('resize', resize, { passive: true });
      window.addEventListener('scroll', updateScroll, { passive: true });
      window.addEventListener('pointermove', updatePointer, { passive: true });
      render();

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', updateScroll);
        window.removeEventListener('pointermove', updatePointer);
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      };
    } catch (error) {
      console.warn('[portfolio-3d] WebGL scene unavailable:', error);
      setAvailable(false);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    }
  }, []);

  if (!available) return <div className="scene-canvas-fallback" aria-hidden="true" />;
  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
