import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

export function initRoomScene(canvas) {
  const scene = new THREE.Scene();
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const d = 2;
  const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000);
  camera.position.set(-2, 2, 2);
  camera.lookAt(0, 0, 0);
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
  renderer.setClearColor("#fafae5", 1);
  SetShadow(scene);

  const loader = new GLTFLoader();
  let targetRotationY = 0;
  let currentRotationY = 0;
  let isHovering = false;
  let mouse = { x: 0 };
  let model = null;

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
  loader.load(
    "./assets/models/simple_room.glb",
    (gltf) => {
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(0, -1.25, 0);
      gltf.scene.rotation.y = Math.PI;
      scene.add(gltf.scene);
      model = gltf.scene;
    },
    undefined,
    (error) => {
      console.error("GLTF load error:", error);
    }
  );

  const DirectionalLight = new THREE.DirectionalLight(new THREE.Color("rgba(241, 203, 203, 1)"), 5);
  const ambientLight = new THREE.AmbientLight(new THREE.Color("rgba(0, 0, 0, 1)"), 1);
  const rectLight = new THREE.RectAreaLight(new THREE.Color("rgba(254, 125, 125, 1)"), 3, 1.5, 1.5);

  DirectionalLight.castShadow = true;
  DirectionalLight.shadow.camera.far = 20;
  DirectionalLight.shadow.mapSize.set(1024, 1024);
  DirectionalLight.shadow.normalBias = 0.05;
  DirectionalLight.position.set(-3, 10, -3);

  DirectionalLight.rotation.set(Math.PI, 0, 0);

  rectLight.position.set(0, 2, 0);
  rectLight.rotation.x = 1.5707963267948966;
  rectLight.rotation.z = 0;
  rectLight.rotation.y = 3.141592653589793;

  scene.add(DirectionalLight);
  scene.add(rectLight);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    if (model) {
      if (isHovering) {
        targetRotationY = Math.PI + mouse.x * Math.PI * 0.25;
      } else {
        targetRotationY = Math.PI;
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
