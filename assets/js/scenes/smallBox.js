import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function initSmallBox(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: "#fafae5", // font-primary
    metalness: 0.3,
    roughness: 0.4,
  });
  const box = new THREE.Mesh(geometry, material);

  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: "#620404" }) // font-secondary
  );
  box.add(outline);
  scene.add(box);

  const light1 = new THREE.PointLight("#fafae5", 1);
  light1.position.set(2, 3, 4);
  scene.add(light1);

  const light2 = new THREE.AmbientLight("#fafae5", 0.5);
  scene.add(light2);
  //#endregion
  let isHovering = false;
  let mouse = { x: 0, y: 0 };

  canvas.addEventListener("mouseenter", () => {
    isHovering = true;
  });

  canvas.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
    mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);

    if (isHovering) {
      box.rotation.y += mouse.x * 0.5;
      box.rotation.x += mouse.y * 0.5;
    } else {
      box.rotation.y += 0.01;
      box.rotation.x += 0.005;
    }

    renderer.render(scene, camera);
  }

  animate();
}
