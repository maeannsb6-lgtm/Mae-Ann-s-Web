import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/** Labelled stages of the client workflow (board coordinates; y is the label anchor height). */
const LABELS = [
  { name: "Inquiry", at: new THREE.Vector3(-3.3, 1.05, 0.2), below: false },
  { name: "Automation", at: new THREE.Vector3(2.4, 1.75, -2.1), below: false },
  { name: "Proposal", at: new THREE.Vector3(3.2, 1.2, 0.9), below: false },
  { name: "Tracking", at: new THREE.Vector3(1.5, 0.1, 3.05), below: true },
  { name: "Follow-up", at: new THREE.Vector3(-1.4, 0.1, 2.85), below: true },
];
/** Stations sit closer together than their board coordinates, so the hardware reads larger. */
const SPREAD = 0.85;

/** Cables from the central hub to each station, routed along the board. */
const CABLES: [number, number][][] = [
  [[-0.95, 0.2], [-2.0, 0.2], [-2.75, 0.2]],
  [[-0.6, -0.95], [-0.6, -2.3], [-1.35, -2.3]],
  [[0.6, -0.95], [0.6, -1.6], [1.8, -1.6], [1.8, -2.1]],
  [[0.95, 0.3], [2.0, 0.3], [2.0, 0.9], [2.5, 0.9]],
  [[0.5, 0.95], [0.5, 2.0], [1.0, 2.0]],
  [[-0.5, 0.95], [-0.5, 1.8], [-0.8, 1.8]],
];

/**
 * Isometric digital twin of a client workflow: inquiries enter, the central
 * automation hub processes them, and proposals, tracking and follow-up run from it.
 */
export default function WorkflowScene() {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFallback(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    const highQuality = window.innerWidth >= 768 && (navigator.hardwareConcurrency || 4) > 4;
    renderer.shadowMap.enabled = highQuality;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04).texture;
    room.dispose();
    pmrem.dispose();
    scene.environment = environment;
    scene.environmentIntensity = 0.5;

    const camera = new THREE.OrthographicCamera(-6, 6, 6, -6, 0.1, 100);
    camera.position.set(10, 11, 12);
    camera.lookAt(0, 0.4, 0);
    scene.add(new THREE.HemisphereLight(0xfff8ee, 0xd8ccb3, 1.1));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.4);
    key.position.set(-4, 10, 7);
    key.castShadow = highQuality;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
    key.shadow.normalBias = 0.03;
    scene.add(key);

    // Landing-page palette: cream, ink, amber.
    const cream = new THREE.MeshStandardMaterial({ color: 0xf6f0e2, roughness: 0.7 });
    const board = new THREE.MeshStandardMaterial({ color: 0xf1eadb, roughness: 0.85 });
    const ink = new THREE.MeshStandardMaterial({ color: 0x1f1b15, roughness: 0.45, metalness: 0.25 });
    const paper = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    const glow = new THREE.MeshStandardMaterial({ color: 0xf5a000, emissive: 0xf5a000, emissiveIntensity: 1.4, toneMapped: false });
    const glass = new THREE.MeshStandardMaterial({
      color: 0xffb53a, emissive: 0xf5a000, emissiveIntensity: 0.9, transparent: true, opacity: 0.72, roughness: 0.2,
    });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xe2d9c4 });
    const materials: THREE.Material[] = [cream, board, ink, paper, glow, glass, lineMaterial];
    const geometries: THREE.BufferGeometry[] = [];

    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) => {
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x * SPREAD, y, z * SPREAD);
      mesh.castShadow = mesh.receiveShadow = highQuality;
      scene.add(mesh);
      return mesh;
    };
    // Rounded blocks read as real hardware rather than flat boxes. y is the block's base.
    const block = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, r = 0.08) =>
      add(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, h / 2 - 0.001)), mat, x, y + h / 2, z);
    const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) =>
      add(new THREE.BoxGeometry(w, h, d), mat, x, y, z);

    // Board with a quiet measuring grid.
    block(9.4, 0.4, 7.4, board, 0, -0.4, 0.1, 0.25).scale.set(SPREAD, 1, SPREAD);
    for (let i = -4; i <= 4; i++) {
      for (const [a, b] of [
        [new THREE.Vector3(i * 0.9, 0.005, -3.0), new THREE.Vector3(i * 0.9, 0.005, 3.2)],
        [new THREE.Vector3(-3.9, 0.005, i * 0.72), new THREE.Vector3(3.9, 0.005, i * 0.72)],
      ]) {
        const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
        geometries.push(geometry);
        scene.add(new THREE.Line(geometry, lineMaterial));
      }
    }

    // Central automation hub: cream tower, ink band, glowing core with a gear inside.
    block(1.9, 0.55, 1.9, cream, 0, 0, 0, 0.14);
    block(1.75, 0.22, 1.75, ink, 0, 0.55, 0, 0.06);
    block(1.75, 0.4, 1.75, cream, 0, 0.77, 0, 0.12);
    const core = block(1.05, 1.0, 1.05, glass, 0, 1.17, 0, 0.06);
    const gear = new THREE.Group();
    const gearRing = new THREE.TorusGeometry(0.22, 0.08, 10, 24);
    const tooth = new THREE.BoxGeometry(0.12, 0.12, 0.14);
    geometries.push(gearRing, tooth);
    gear.add(new THREE.Mesh(gearRing, ink));
    for (let i = 0; i < 8; i++) {
      const t = new THREE.Mesh(tooth, ink);
      const a = (i / 8) * Math.PI * 2;
      t.position.set(Math.cos(a) * 0.32, Math.sin(a) * 0.32, 0);
      t.rotation.z = a;
      gear.add(t);
    }
    gear.position.set(0, 1.67, 0);
    gear.rotation.x = -Math.PI / 2;
    scene.add(gear);

    // Inquiry: a printer with incoming documents.
    block(1.2, 0.45, 1.0, ink, -3.3, 0, 0.2, 0.1);
    block(1.1, 0.12, 0.9, cream, -3.3, 0.45, 0.2, 0.04);
    const sheet = box(0.7, 0.02, 0.85, paper, -3.35, 0.72, 0.15);
    sheet.rotation.set(-0.35, 0.1, 0);
    box(0.7, 0.02, 0.85, paper, -3.3, 0.6, 0.25).rotation.set(-0.15, 0.05, 0);

    // Data store (back left).
    block(1.3, 0.45, 1.3, ink, -2.0, 0, -2.3, 0.1);
    block(1.3, 0.4, 1.3, cream, -2.0, 0.45, -2.3, 0.1);

    // Automation: an ink unit with amber status bars and an antenna.
    block(1.2, 1.15, 1.2, ink, 2.4, 0, -2.1, 0.1);
    [-0.32, -0.08, 0.16].forEach((x, i) => box(0.12, 0.35 + i * 0.12, 0.02, glow, 2.4 + x, 0.45 + i * 0.06, -1.49));
    add(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), ink, 2.4, 1.32, -2.1);
    add(new THREE.SphereGeometry(0.07, 12, 8), glow, 2.4, 1.52, -2.1);

    // Proposal: a stack of documents with glowing slots.
    block(1.45, 0.32, 1.25, ink, 3.2, 0, 0.9, 0.08);
    block(1.45, 0.26, 1.25, cream, 3.2, 0.32, 0.9, 0.08);
    block(1.45, 0.32, 1.25, ink, 3.2, 0.58, 0.9, 0.08);
    block(1.35, 0.22, 1.15, cream, 3.2, 0.9, 0.9, 0.08);
    [0.16, 0.74].forEach((y) => box(0.9, 0.05, 0.02, glow, 3.2, y, 1.53));

    // Tracking: a reporting unit with a rising bar chart.
    block(1.1, 0.4, 1.0, ink, 1.5, 0, 2.5, 0.08);
    [0.18, 0.3, 0.44].forEach((h, i) => box(0.16, h, 0.16, glow, 1.2 + i * 0.3, 0.4 + h / 2, 2.5));

    // Follow-up: a client on a cream plinth.
    block(1.2, 0.5, 1.0, cream, -1.4, 0, 2.3, 0.12);
    add(new THREE.CylinderGeometry(0.17, 0.24, 0.32, 16), ink, -1.4, 0.66, 2.3);
    add(new THREE.SphereGeometry(0.15, 16, 12), ink, -1.4, 0.95, 2.3);

    // Cables: an ink sheath with a glowing amber line, plus data packets travelling outwards.
    const packets: { mesh: THREE.Mesh; curve: THREE.Curve<THREE.Vector3>; offset: number }[] = [];
    const packetGeometry = new THREE.SphereGeometry(0.07, 10, 8);
    geometries.push(packetGeometry);
    CABLES.forEach((route, index) => {
      const curve = new THREE.CatmullRomCurve3(
        route.map(([x, z]) => new THREE.Vector3(x * SPREAD, 0.07, z * SPREAD)), false, "catmullrom", 0.05,
      );
      add(new THREE.TubeGeometry(curve, 48, 0.07, 8, false), ink, 0, 0, 0);
      add(new THREE.TubeGeometry(curve, 48, 0.028, 6, false), glow, 0, 0.055, 0);
      const mesh = add(packetGeometry, glow, 0, 0, 0);
      mesh.castShadow = false;
      packets.push({ mesh, curve, offset: index / CABLES.length });
    });

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let aspect = 1;
    let visible = false;
    let raf = 0;
    const point = new THREE.Vector3();
    const spread = new THREE.Vector3(SPREAD, 1, SPREAD);
    const frame = () => {
      // Fit by height and width so the whole board is visible in any column shape.
      const half = Math.max(4.0, 5.7 / aspect);
      const y = 0.46;
      camera.left = -half * aspect;
      camera.right = half * aspect;
      camera.top = half * (2 * y);
      camera.bottom = -half * (2 - 2 * y);
      camera.updateProjectionMatrix();
    };
    const draw = (time: number) => {
      const t = motion.matches ? 0 : time / 1000;
      gear.rotation.z = t * 0.6;
      core.position.y = 1.17 + 0.5 + Math.sin(t * 1.4) * 0.04;
      packets.forEach(({ mesh, curve, offset }) => {
        curve.getPointAt((t * 0.22 + offset) % 1, mesh.position);
        mesh.position.y += 0.06;
      });
      renderer.render(scene, camera);
      labels.current.forEach((label, i) => {
        if (!label) return;
        point.copy(LABELS[i].at).multiply(spread).project(camera);
        label.style.transform = `translate(${((point.x + 1) / 2) * element.clientWidth}px, ${((1 - point.y) / 2) * element.clientHeight}px)`;
      });
    };
    const loop = (time: number) => {
      draw(time);
      raf = visible && !document.hidden && !motion.matches ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const resize = new ResizeObserver(() => {
      const w = element.clientWidth;
      const h = element.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      aspect = w / h;
      frame();
      draw(performance.now());
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    observer.observe(element);
    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);
    const contextLost = (event: Event) => {
      event.preventDefault();
      setFallback(true);
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={host} className="workflow-scene">
      {LABELS.map((label, i) => (
        <span
          key={label.name}
          ref={(el) => {
            labels.current[i] = el;
          }}
          className={label.below ? "workflow-label workflow-label--below" : "workflow-label"}
          aria-hidden="true"
        >
          <b>{label.name}</b>
        </span>
      ))}
      {fallback && <div className="scene-fallback"><span /><span /><span /></div>}
    </div>
  );
}
