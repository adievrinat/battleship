import template from "./template";
import CreateMain from "../menu/main/main";
import store from "../../store/store";

class Preloader {
  constructor() {
    if (typeof Preloader.instance === "object") {
      return Preloader.instance;
    }

    this.battleship = document.getElementById("battleship");
    this.battleship.innerHTML = template;
    this.preloader = this.battleship.querySelector("[data-preloader]");
    this.preloaderStart = this.preloader.querySelector("[data-preloader-start]");
    this.preloaderStartButton = this.preloaderStart.querySelector("[data-preloader-start-button]");
    this.preloaderIcon = this.preloader.querySelector("[data-preloader-icon]");
    this.clipPath = this.preloaderIcon.querySelector("#chief-clip-path");
    this.preloaderIconInner = this.battleship.querySelector("[data-preloader-icon-inner]");
    this.preloaderTextContainer = this.battleship.querySelector("[data-preloader-text-container]");
    this.preloaderText = this.preloaderTextContainer.querySelector("[data-preloader-text]");

    Preloader.instance = this;
    return this;
  }

  start() {
    this.preloaderStartButton.addEventListener("click", () => {
      this.preloaderStart.remove();
      this.startPreloader();
    });
  }

  startPreloader() {
    let x = 100;
    let animation = () => {
      this.clipPath.querySelector("rect").style.transform = "translateY(" + --x + "%)";

      if (x > 0) {
        setTimeout(() => {
          animation();
        }, 1000 / 35);
      } else {
        setTimeout(() => {
          this.preloaderIcon.classList.add("transform");
          this.preloaderIconInner.classList.add("transform");
          let chiefSong = new Audio("../../public/chief-song.mp3");
          // chiefSong.setAttribute("muted", "muted");
          chiefSong.volume = 0.5;
          chiefSong.addEventListener("canplaythrough", () => {
            /* the audio is now playable; play it if permissions allow */
            chiefSong.play();
          });

          setTimeout(() => {
            this.typingText(this.preloaderText);
          }, 1000);
        }, 500);
      }
    };

    setTimeout(() => {
      animation();
    }, 2000);
  }

  typingText(element) {
    let text = element.getAttribute('data-preloader-text-content');
    let symbols = text.split("");
    let length = symbols.length;
    let path = 0;
    element.innerHTML = '';

    this.addSymbol(length, path, element, symbols);
  }

  addSymbol(length, path, textEntry, symbols) {
    if (length > path) {
      textEntry.innerHTML += symbols[path];
      path = path + 1;

      setTimeout(() => {
        this.addSymbol(length, path, textEntry, symbols);
      }, 80);

      if (path === length) {
        setTimeout(() => {
          this.addButtonNext();
        }, 400);
      }
    }
  };

  addButtonNext() {
    let buttonNext = document.createElement("div");
    buttonNext.classList.add("preloader__button-next");
    buttonNext.innerText = "Next";
    buttonNext.addEventListener("click", () => {
      delete store.gameCls.preloader;
      store.menuCls = new CreateMain();
    });

    this.preloaderTextContainer.appendChild(buttonNext);

    setTimeout(() => {
      this.preloader.querySelector(".preloader__button-next").classList.add("animation");
    }, 300);
  }
}

export default Preloader;