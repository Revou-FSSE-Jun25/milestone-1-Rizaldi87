import { initSmallBox } from "./scenes/smallBox.js";
import { initRoomScene } from "./scenes/room.js";
import { initPictures } from "./scenes/pictures.js";
import { initComputerScene } from "./scenes/computer.js";

const smallBoxCanvas = document.getElementById("small-box");
const roomCanvas = document.getElementById("room");
const pictureCanvas = document.getElementById("pictures");
const computerCanvas1 = document.getElementById("computer1");
const computerCanvas2 = document.getElementById("computer2");
const computerCanvas3 = document.getElementById("computer3");
const computerCanvas4 = document.getElementById("computer4");
const computerCanvas5 = document.getElementById("computer5");
const computerCanvas6 = document.getElementById("computer6");

const imageList = ["assets/images/projects/Screenshot 2025-03-12 125257.png", "assets/images/projects/image.png", "assets/images/projects/Screenshot 2025-07-09 181339.png"];
initComputerScene(computerCanvas1, imageList);
const imageList2 = ["assets/images/projects/Screenshot 2024-01-02 162231.png", "assets/images/projects/Screenshot 2024-01-02 162635.png", "assets/images/projects/Screenshot 2024-01-02 220810.png"];
initComputerScene(computerCanvas2, imageList2);

const imageList3 = ["assets/images/projects/Screenshot (177).png", "assets/images/projects/Screenshot (178).png", "assets/images/projects/Screenshot (180).png"];
initComputerScene(computerCanvas3, imageList3);

const imageList4 = ["assets/images/projects/Screenshot (145).png", "assets/images/projects/Screenshot 2023-06-27 125500.png", "assets/images/projects/Screenshot 2025-01-24 140348.png"];
initComputerScene(computerCanvas4, imageList4);

const imageList5 = ["assets/images/projects/Screenshot 2025-03-15 112115.png", "assets/images/projects/Screenshot 2025-03-15 111920.png", "assets/images/projects/Screenshot 2024-09-15 153328.png"];
initComputerScene(computerCanvas5, imageList5);

const imageList6 = ["assets/images/projects/Screenshot 2024-07-19 134607.png", "assets/images/projects/Screenshot 2024-07-19 142720.png", "assets/images/projects/Screenshot 2024-07-19 142730.png"];
initComputerScene(computerCanvas6, imageList6);

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
function moveComputerForMobile() {
  const canvases = document.querySelectorAll(".computer");
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
