import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

export function initPictures(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.physicallyCorrectLights = true;
  renderer.shadow = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = 0;
  renderer.toneMappingExposure = 1.75;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor("rgba(250, 250, 229, 1)", 1);
  SetShadow(scene);

  let targetRotationY = 0;
  let currentRotationY = 0;
  let isHovering = false;
  let mouse = { x: 0 };

  canvas.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  canvas.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    mouse.x = x - 0.5;
  });

  const loader = new GLTFLoader();
  let model = null;
  loader.load(
    "./assets/models/pictures.glb",
    (gltf) => {
      model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, 0, 0);
      model.rotation.y = -Math.PI / 2;
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("GLTF load error:", error);
    }
  );

  const light1 = new THREE.DirectionalLight(new THREE.Color("rgba(241, 203, 203, 1)"), 1);
  const light2 = new THREE.AmbientLight(new THREE.Color("rgba(0, 0, 0, 1)"), 1);
  const rectLight = new THREE.RectAreaLight(new THREE.Color("rgba(120, 81, 81, 1)"), 3, 1.5, 1.5);

  light1.position.set(2, 3, 4);
  rectLight.position.set(0, 0, 0.15);
  scene.add(light1, light2, rectLight);

  function animate() {
    requestAnimationFrame(animate);
    if (model) {
      if (isHovering) {
        targetRotationY = -Math.PI / 2 - mouse.x * (-Math.PI / 2) * 0.25;
      } else {
        targetRotationY = -Math.PI / 2;
      }
      currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.05);
      model.rotation.y = currentRotationY;
    }
    renderer.render(scene, camera);
  }
  animate();
}
function SetShadow(scene) {
  scene.traverse(function (object) {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    } else if (object.name === "Spot") {
      object.intensity = 0;
    }
  });
}
