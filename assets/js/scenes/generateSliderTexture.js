import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm"; // kalau pakai module

let sliderTexture;
let material;

export function generateSliderTexture(callback, sliderElement) {
  html2canvas(sliderElement, {
    backgroundColor: null,
    useCORS: true,
  }).then((canvasSnapshot) => {
    sliderTexture = new THREE.CanvasTexture(canvasSnapshot);
    sliderTexture.colorSpace = THREE.SRGBColorSpace;
    sliderTexture.needsUpdate = true;
    sliderTexture.generateMipmaps = false;
    sliderTexture.minFilter = THREE.LinearFilter;
    sliderTexture.magFilter = THREE.LinearFilter;

    material = new THREE.MeshBasicMaterial({
      map: sliderTexture,
      side: THREE.FrontSide,
      toneMapped: false,
    });

    if (callback) callback(material);
  });
}
