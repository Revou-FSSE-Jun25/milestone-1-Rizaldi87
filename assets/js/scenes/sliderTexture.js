import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/**
 * Inisialisasi slider tekstur
 * @param {Array} urls - Array berisi URL gambar
 * @param {Function} onMaterialReady - Callback ketika material sudah siap
 * @param {Number} interval - Waktu interval perpindahan (ms)
 */
export function createTextureSlider(urls, onMaterialReady, interval = 3000) {
  let currentIndex = 0;
  let imageUrls = urls;
  let textureMaterial = null;
  let intervalId = null;

  function loadImageTexture(url, callback) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => {
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.flipY = false;
      callback(texture);
    };
  }

  function nextTexture() {
    if (!textureMaterial || imageUrls.length === 0) return;

    currentIndex = (currentIndex + 1) % imageUrls.length;
    loadImageTexture(imageUrls[currentIndex], (texture) => {
      textureMaterial.map = texture;
      textureMaterial.needsUpdate = true;
    });
  }

  function stop() {
    clearInterval(intervalId);
  }

  loadImageTexture(imageUrls[currentIndex], (texture) => {
    textureMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      toneMapped: false,
    });

    if (onMaterialReady) onMaterialReady(textureMaterial);
  });

  intervalId = setInterval(nextTexture, interval);

  return { stop, nextTexture };
}
