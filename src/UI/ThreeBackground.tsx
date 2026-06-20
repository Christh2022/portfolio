import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 180;
const SPREAD = 800;

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 3000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Nodes positions
    const positions: THREE.Vector3[] = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD * 0.6,
        (Math.random() - 0.5) * SPREAD * 0.4
      )
    );

    // Velocities
    const velocities: THREE.Vector3[] = positions.map(() =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.1
      )
    );

    // Node spheres
    const nodeGeo = new THREE.SphereGeometry(2.5, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x6666ff });
    const nodeMeshes = positions.map((pos) => {
      const m = new THREE.Mesh(nodeGeo, nodeMat.clone());
      m.position.copy(pos);
      // vary brightness slightly
      (m.material as THREE.MeshBasicMaterial).color.setHSL(
        0.6 + Math.random() * 0.1,
        0.8,
        0.5 + Math.random() * 0.3
      );
      scene.add(m);
      return m;
    });

    // Lines geometry (reused each frame)
    const MAX_LINES = NODE_COUNT * 4;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.35 });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // Floating data particles (small bright dots)
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * SPREAD;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00ffcc, size: 1.5, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Move nodes
      positions.forEach((pos, i) => {
        pos.add(velocities[i]);
        // Bounce
        if (Math.abs(pos.x) > SPREAD / 2) velocities[i].x *= -1;
        if (Math.abs(pos.y) > (SPREAD * 0.6) / 2) velocities[i].y *= -1;
        if (Math.abs(pos.z) > (SPREAD * 0.4) / 2) velocities[i].z *= -1;
        nodeMeshes[i].position.copy(pos);
      });

      // Update lines
      let lineIdx = 0;
      for (let a = 0; a < NODE_COUNT && lineIdx < MAX_LINES; a++) {
        for (let b = a + 1; b < NODE_COUNT && lineIdx < MAX_LINES; b++) {
          const dist = positions[a].distanceTo(positions[b]);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE;
            linePositions[lineIdx * 6]     = positions[a].x;
            linePositions[lineIdx * 6 + 1] = positions[a].y;
            linePositions[lineIdx * 6 + 2] = positions[a].z;
            linePositions[lineIdx * 6 + 3] = positions[b].x;
            linePositions[lineIdx * 6 + 4] = positions[b].y;
            linePositions[lineIdx * 6 + 5] = positions[b].z;
            // Color: blue-violet gradient
            lineColors[lineIdx * 6]     = 0.3 * alpha;
            lineColors[lineIdx * 6 + 1] = 0.2 * alpha;
            lineColors[lineIdx * 6 + 2] = alpha;
            lineColors[lineIdx * 6 + 3] = 0.3 * alpha;
            lineColors[lineIdx * 6 + 4] = 0.2 * alpha;
            lineColors[lineIdx * 6 + 5] = alpha;
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // Rotate particles slowly
      particles.rotation.y += 0.0005;

      // Camera subtle parallax on mouse
      camera.position.x += (mouseX * 40 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 20 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
