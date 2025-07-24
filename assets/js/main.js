import { initSmallBox } from "./scenes/smallBox.js";
import { initRoomScene } from "./scenes/room.js";
import { initPictures } from "./scenes/pictures.js";

const smallBoxCanvas = document.getElementById("small-box");
const roomCanvas = document.getElementById("room");
const pictureCanvas = document.getElementById("pictures");

initPictures(pictureCanvas);
initRoomScene(roomCanvas);
initSmallBox(smallBoxCanvas);

// nav
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY <= 0) {
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }
});
document.querySelector(".menu-icon").addEventListener("click", () => {
  document.querySelector("ul").classList.toggle("activate");
});
window.dispatchEvent(new Event("scroll"));

//image slider
document.querySelectorAll(".image-slider").forEach((slider) => {
  const sliderWrapper = slider.querySelector(".slider-wrapper");
  const sliderImages = sliderWrapper.querySelectorAll("img");
  const totalImages = sliderImages.length;
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  let index = 0;

  function updateButton() {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalImages - 1;
  }
  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    updateButton();
  }
  nextBtn.addEventListener("click", () => {
    if (index < totalImages - 1) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });
  updateSlider();
});

function moveComputerForMobile() {
  const canvases = document.querySelectorAll(".image-slider");
  const projectInfo = document.querySelectorAll(".project-info");
  const articles = document.querySelectorAll(".project-flex");

  if (window.innerWidth <= 768) {
    projectInfo.forEach((info, index) => {
      const h3 = info.querySelector("h3");
      const canvas = canvases[index];
      if (canvas && !info.contains(canvas)) {
        h3.insertAdjacentElement("afterend", canvas);
      }
    });
  } else {
    articles.forEach((article, index) => {
      const canvas = canvases[index];
      if (canvas && article.contains(canvas)) {
        article.appendChild(canvas);
      }
    });
  }
}

window.addEventListener("load", moveComputerForMobile);
window.addEventListener("resize", moveComputerForMobile);

//loading overlay
const loadingOverlay = document.querySelector(".loading-overlay");
window.addEventListener("load", () => {
  // Tambahkan class 'fade' untuk mulai mengaktifkan transisi
  loadingOverlay.classList.add("show"); // pastikan overlay terlihat
  requestAnimationFrame(() => {
    // Tambahkan fade di frame berikutnya agar tidak trigger di awal
    loadingOverlay.classList.add("fade");
    setTimeout(() => {
      loadingOverlay.classList.remove("show");
    }, 1700);
  });
});
