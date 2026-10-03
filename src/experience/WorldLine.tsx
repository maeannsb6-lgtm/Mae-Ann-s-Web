import { useEffect, useMemo, useRef, useState } from 'react';
import { useStory } from './StoryController';

type Point = [number, number, number];
type Line = [Point, Point];

function addLine(target: number[], a: Point, b: Point) {
  target.push(...a, ...b);
}

function lineData(chapter: number, progress: number, compact: boolean) {
  const lines: Line[] = [];
  const z = compact ? -8 : -10;

  if (chapter === 0) {
    const length = 1.2 + progress * 8;
    lines.push([[0, 0, -3], [0, 0, -3 - length]]);
    const s = 0.08 + progress * 0.08;
    lines.push([[-s, 0, -3], [s, 0, -3]], [[0, -s, -3], [0, s, -3]]);
  }

  if (chapter === 1) {
    lines.push([[0, 0, -3], [0, 0, z]]);
    const branches = compact ? 4 : 7;
    for (let i = 0; i < branches; i += 1) {
      const y = (i - (branches - 1) / 2) * .7;
      const direction = i % 2 === 0 ? 1 : -1;
      const reach = .9 + progress * (1.2 + (i % 3) * .45);
      const depth = -4.2 - i * .7;
      lines.push([[0, 0, depth], [direction * reach, y, depth - .8]]);
    }
  }

  if (chapter === 2) {
    const nodes: Point[] = [
      [0, 0, -4], [-2.2, 1.1, -6], [2.1, 1.25, -6.8], [-2.4, -1.35, -8.2],
      [2.35, -1.2, -9.1], [0, 2.05, -10.3], [0, -2.1, -11.5],
    ];
    nodes.slice(1).forEach((node) => lines.push([nodes[0], node]));
    for (let i = 1; i < nodes.length - 1; i += 1) lines.push([nodes[i], nodes[i + 1]]);
  }

  if (chapter === 3) {
    const raw: Point[] = [
      [-2.7, 1.9, -4], [1.6, -1.5, -5.3], [-1.8, -.4, -6.7], [2.6, 1.1, -8],
      [-.6, 2.2, -9.3], [1.1, -2.0, -10.8], [-2.5, .8, -12],
    ];
    const ordered: Point[] = raw.map((_, index) => [
      -2.4 + index * .8,
      0,
      -4 - index * 1.25,
    ] as Point);
    const points = raw.map((point, index) => [
      point[0] + (ordered[index][0] - point[0]) * progress,
      point[1] + (ordered[index][1] - point[1]) * progress,
      point[2] + (ordered[index][2] - point[2]) * progress,
    ] as Point);
    for (let i = 0; i < points.length - 1; i += 1) lines.push([points[i], points[i + 1]]);
  }

  if (chapter === 4) {
    const frames = compact ? 3 : 5;
    for (let i = 0; i < frames; i += 1) {
      const depth = -4 - i * 2.2;
      const w = 1.5 + i * .18;
      const h = .9 + i * .1;
      lines.push(
        [[-w, -h, depth], [w, -h, depth]],
        [[w, -h, depth], [w, h, depth]],
        [[w, h, depth], [-w, h, depth]],
        [[-w, h, depth], [-w, -h, depth]],
      );
      if (i > 0) lines.push([[0, 0, depth + 2.2], [0, 0, depth]]);
    }
  }

  if (chapter === 5) {
    const points: Point[] = [
      [-2.5, -1.4, -4], [-1.8, -.7, -5.7], [-1.1, -.2, -7.2], [-.3, .5, -8.8],
      [.65, .95, -10.4], [1.45, 1.55, -12], [2.4, 2.0, -13.6],
    ];
    for (let i = 0; i < points.length - 1; i += 1) {
      lines.push([points[i], points[i + 1]]);
      const p = points[i + 1];
      lines.push([[p[0] - .2, p[1], p[2]], [p[0] + .2, p[1], p[2]]]);
    }
  }

  if (chapter === 6) {
    const levels = compact ? 4 : 6;
    lines.push([[-2.8, 0, -4], [2.8, 0, -4]]);
    for (let i = 0; i < levels; i += 1) {
      const x = -2.4 + i * (4.8 / Math.max(1, levels - 1));
      const depth = -5 - i * 1.25;
      lines.push([[x, 0, -4], [x, i % 2 ? 1.35 : -1.35, depth]]);
      lines.push([[x, i % 2 ? 1.35 : -1.35, depth], [x + .45, i % 2 ? 1.35 : -1.35, depth]]);
    }
  }

  if (chapter === 7) {
    const origin: Point = [0, 0, -4];
    const rays = compact ? 4 : 7;
    for (let i = 0; i < rays; i += 1) {
      const t = i / (rays - 1);
      const x = -3.4 + t * 6.8;
      const y = (t - .5) * 2.4;
      lines.push([origin, [x, y, -10 - progress * 3]]);
    }
  }

  if (chapter === 8) {
    const spread = (1 - progress) * 2.8;
    for (let i = 0; i < 6; i += 1) {
      const angle = (Math.PI * 2 * i) / 6;
      const start: Point = [Math.cos(angle) * spread, Math.sin(angle) * spread, -5 - i * .7];
      lines.push([start, [0, 0, -10]]);
    }
    lines.push([[0, 0, -3.5], [0, 0, -12.5]]);
  }

  const flat: number[] = [];
  lines.forEach(([a, b]) => addLine(flat, a, b));
  return new Float32Array(flat);
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Shader creation failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed');
  return shader;
}

function programFor(gl: WebGLRenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, `
    attribute vec3 aPosition;
    uniform float uAspect;
    uniform float uPush;
    varying float vDepth;
    void main() {
      vec3 p = aPosition;
      p.z += uPush;
      float d = max(1.7, -p.z);
      vec2 projected = p.xy / d * 2.4;
      projected.x /= max(.72, uAspect);
      gl_Position = vec4(projected, 0.0, 1.0);
      vDepth = smoothstep(15.0, 2.5, d);
    }
  `);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying float vDepth;
    void main() {
      gl_FragColor = vec4(.176, .831, .749, (.14 + vDepth * .42));
    }
  `);
  const program = gl.createProgram();
  if (!program) throw new Error('Program creation failed');
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  return program;
}

export default function WorldLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeIndex, progress, reducedMotion, compact } = useStory();
  const [supported, setSupported] = useState(true);
  const geometry = useMemo(() => lineData(activeIndex, reducedMotion ? .7 : progress, compact), [activeIndex, progress, reducedMotion, compact]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) {
      setSupported(false);
      return;
    }

    const program = programFor(gl);
    const buffer = gl.createBuffer();
    if (!buffer) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.35);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry, gl.DYNAMIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(gl.getUniformLocation(program, 'uAspect'), canvas.width / Math.max(1, canvas.height));
    gl.uniform1f(gl.getUniformLocation(program, 'uPush'), activeIndex === 0 ? progress * .7 : 0);
    gl.drawArrays(gl.LINES, 0, geometry.length / 3);

    return () => {
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [geometry, activeIndex, progress, compact]);

  if (!supported) return <div className="world-line-fallback" aria-hidden="true" />;
  return <canvas ref={canvasRef} className={'world-line world-line--' + activeIndex} aria-hidden="true" />;
}
