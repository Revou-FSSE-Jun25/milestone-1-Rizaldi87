import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { createTextureSlider } from "./sliderTexture.js";
export function initComputerScene(canvas, imageList) {
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

  //   }

  loader.load(
    "./assets/models/computer.glb",
    (gltf) => {
      model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.set(0, -0.2, 0.75);
      scene.add(model);

      createTextureSlider(imageList, (material) => {
        const mesh = gltf.scene.getObjectByName("Scene");
        if (!mesh) return;
        mesh.traverse((child) => {
          if (child.name !== "Monitor") return;
          let monitor = child;
          monitor.traverse((child) => {
            if (child.name !== "Cube003_1") return;
            child.material = material;
          });
        });
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const light1 = new THREE.DirectionalLight(new THREE.Color(0x620404), 5);
  const light2 = new THREE.AmbientLight(new THREE.Color(0.19215686274509805, 0.30196078431372547, 0.6274509803921569), 0.5);
  const rectLight = new THREE.RectAreaLight(new THREE.Color(0.188, 0.004, 0.004), 3, 1.5, 1.5);

  light1.position.set(2, 3, 4);
  rectLight.position.set(0, 0, 0.5);
  scene.add(light1, light2, rectLight);
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
