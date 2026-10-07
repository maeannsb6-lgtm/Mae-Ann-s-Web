import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/** One geometric digital twin, shared by the opening narrative. No textures or external models. */
export default function EngineeringScene() {
  const host = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFallback(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-6, 6, 6, -6, 0.1, 100);
    camera.position.set(11, 12, 14);
    camera.lookAt(0, 0.3, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x879393, 3));
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(-4, 8, 6);
    scene.add(light);
    const group = new THREE.Group();
    scene.add(group);
    const chalk = new THREE.MeshStandardMaterial({
      color: 0xe9e9e2,
      roughness: 0.7,
      metalness: 0.08,
    });
    const steel = new THREE.MeshStandardMaterial({
      color: 0x97a8ac,
      roughness: 0.48,
      metalness: 0.28,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x3c535e,
      roughness: 0.5,
      metalness: 0.24,
    });
    const blue = new THREE.MeshStandardMaterial({
      color: 0x537d92,
      roughness: 0.4,
      metalness: 0.28,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: 0xc3a57b,
      roughness: 0.5,
    });
    const geometries = new Set<THREE.BufferGeometry>();
    const materials: THREE.Material[] = [chalk, steel, dark, blue, accent];
    const add = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) => {
      geometries.add(geometry);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      group.add(mesh);
      return mesh;
    };
    const box = (
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) => add(new THREE.BoxGeometry(w, h, d), mat, x, y, z);
    const cylinder = (
      r: number,
      h: number,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) => add(new THREE.CylinderGeometry(r, r, h, 24), mat, x, y, z);
    box(8.6, 0.2, 6.6, chalk, 0, -0.25, 0);
    box(8.25, 0.08, 6.25, steel, 0, -0.12, 0);
    box(8.15, 0.09, 6.15, chalk, 0, -0.04, 0);
    // A continuous production pathway rather than disconnected floating objects.
    const points = [
      [-3, 2],
      [-3, -1.7],
      [-1.3, -1.7],
      [1.1, -1.7],
      [3, -1.7],
      [3, 1.7],
      [1.1, 1.7],
      [-1.3, 1.7],
      [-3, 2],
    ];
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, z]) => new THREE.Vector3(x, 0.19, z)),
      true,
      "catmullrom",
      0.08,
    );
    add(new THREE.TubeGeometry(curve, 96, 0.055, 6, true), steel, 0, 0, 0);
    const automatedPath = add(
      new THREE.TubeGeometry(curve, 96, 0.065, 6, true),
      blue,
      0,
      0.015,
      0,
    );
    automatedPath.visible = false;
    // Input storage, a processing station, inspection, and output storage.
    [-2.9, 2.9].forEach((x) => {
      box(1.45, 0.3, 1.6, steel, x, 0.2, 0);
      for (let i = 0; i < 3; i++)
        box(1.1, 0.26, 1.15, i === 2 ? blue : chalk, x, 0.5 + i * 0.32, 0);
    });
    box(2, 0.2, 2.1, dark, -0.85, 0.2, -0.1);
    [-1.6, -0.1].forEach((x) =>
      [-0.8, 0.7].forEach((z) => box(0.13, 1.85, 0.13, steel, x, 1.15, z)),
    );
    box(2, 0.17, 2.1, chalk, -0.85, 2.14, -0.1);
    box(1.25, 0.25, 0.9, steel, -0.85, 1.85, -0.1);
    cylinder(0.32, 0.8, blue, -0.85, 1.32, -0.1);
    box(1.25, 0.2, 1.65, steel, 1.25, 0.2, 0);
    cylinder(0.46, 0.2, dark, 1.25, 0.42, 0);
    cylinder(0.34, 0.28, chalk, 1.25, 0.66, 0);
    box(0.16, 1.65, 0.16, steel, 1.9, 0.94, 0.45);
    box(0.8, 0.12, 0.18, blue, 1.53, 1.8, 0.45);
    // Measured construction lines give the base a quiet engineering character.
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xbfc8c5 });
    materials.push(lineMaterial);
    for (let i = -4; i <= 4; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, 0.016, -3),
        new THREE.Vector3(i, 0.016, 3),
      ]);
      geometries.add(geometry);
      group.add(new THREE.Line(geometry, lineMaterial));
    }
    const units = Array.from({ length: 5 }, (_, i) =>
      box(0.34, 0.28, 0.34, i === 0 ? accent : blue, 0, 0.42, 0),
    );
    const bridges = new THREE.Group();
    group.add(bridges);
    const bridgeGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3, 0.18, -2.65),
      new THREE.Vector3(0, 0.18, -2.65),
      new THREE.Vector3(3, 0.18, -2.65),
    ]);
    geometries.add(bridgeGeometry);
    bridges.add(new THREE.Line(bridgeGeometry, lineMaterial));
    group.rotation.y = -0.18;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    let reduced = motionQuery.matches;
    let visible = true,
      target = 0,
      current = 0,
      raf = 0,
      last = 0;
    const updateTarget = () => {
      const chapters =
        document.querySelectorAll<HTMLElement>("[data-story-stage]");
      let progress = 0;
      chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.65)
          progress = Number(chapter.dataset.storyStage);
      });
      target = progress;
      if (reduced) {
        current = target;
        draw(0);
      }
    };
    const draw = (time: number) => {
      current += (target - current) * 0.045;
      group.rotation.y = -0.18 + current * 0.045;
      automatedPath.visible = current > 1.6;
      bridges.visible = current > 2.3;
      units.forEach((unit, i) => {
        const position = curve.getPointAt(
          (i / units.length + (reduced ? 0 : time * 0.000018)) % 1,
        );
        unit.position.set(position.x, 0.43, position.z);
      });
      renderer.render(scene, camera);
    };
    const loop = (time: number) => {
      if (!visible || document.hidden || reduced || mobileQuery.matches) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      if (time - last < 33) return;
      last = time;
      draw(time);
    };
    const start = () => {
      draw(last);
      if (
        !raf &&
        visible &&
        !document.hidden &&
        !reduced &&
        !mobileQuery.matches
      )
        raf = requestAnimationFrame(loop);
    };
    const resize = new ResizeObserver(() => {
      const w = element.clientWidth,
        h = element.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      const aspect = w / h;
      camera.left = -5.5 * aspect;
      camera.right = 5.5 * aspect;
      camera.top = 5.5;
      camera.bottom = -5.5;
      camera.updateProjectionMatrix();
      start();
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    observer.observe(element);
    const visibility = () => start();
    const preferences = () => {
      reduced = motionQuery.matches;
      start();
    };
    window.addEventListener("scroll", updateTarget, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    motionQuery.addEventListener("change", preferences);
    mobileQuery.addEventListener("change", preferences);
    updateTarget();
    start();
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
      window.removeEventListener("scroll", updateTarget);
      document.removeEventListener("visibilitychange", visibility);
      motionQuery.removeEventListener("change", preferences);
      mobileQuery.removeEventListener("change", preferences);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div ref={host} className="engineering-scene">
      {fallback && (
        <div className="scene-fallback">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}
