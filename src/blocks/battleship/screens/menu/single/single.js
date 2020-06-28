import addInStore from "../../../store/addInStore";
import SingleAddShips from "../../addShips/single/single";
import store from "../../../store/store";

class SinglePlayer {
  constructor() {
    if (typeof SinglePlayer.instance === "object") {
      return SinglePlayer.instance;
    }

    this.player = {
      name: ''
    };
    this.menuContainer = document.querySelector("[data-bsp-menu-container]");

    this.single();

    SinglePlayer.instance = this;
    return this;
  }

  single() {
    let mainMenu = document.querySelector("[data-bsp-main-menu]");
    mainMenu.remove();

    let menu = document.createElement("div");
    menu.classList.add("battleship-menu__single-player-menu");
    menu.classList.add("bsp-menu");

    menu.setAttribute("data-bsp-sp-menu", "");

    let button = document.createElement("div");
    button.classList.add("bsp-menu__next");
    button.innerHTML = "Next";
    button.addEventListener("click", this.nextStep.bind(this));

    menu.appendChild(this.createInput("bsp-menu-single-name", "Enter your name", "BSP_SINGLE_NAME"));
    menu.appendChild(button);

    this.menuContainer.appendChild(menu);
  }

  createInput(id, labelText, name) {
    let formGroup = document.createElement("div");
    let labelName = document.createElement("label");
    let input = document.createElement("input");

    formGroup.classList.add("bsp-menu__form-group");

    labelName.setAttribute("for", id);
    labelName.innerText = labelText;

    input.setAttribute("type", "text");
    input.setAttribute("id", id);
    input.setAttribute("name", name);
    input.setAttribute("data-bsp-sp-name-input", "");
    input.setAttribute("required", "");
    input.addEventListener("input", (e) => {
      this.addName(e);
    });

    labelName.classList.add("bsp-menu__label");
    input.classList.add("bsp-menu__input");

    formGroup.appendChild(labelName);
    formGroup.appendChild(input);

    return formGroup;
  }

  addName(e) {
    this.player.name = e.currentTarget.value;
  }

  addPlayer() {
    let player = {
      name: this.player.name,
      winnings: 0,
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      // opponentBoard: [
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      // ],
      bombedOpponent: { all: 0, battleship: 0, cruiser: 0, destroyer: 0, torpedo: 0 },
      bombedAll: 0,
      ships: {
        battleship: {
          id: "single-ships-1",
          dataId: 1,
          name: "Линкор",
          type: "battleship",
          length: 4,
          count: 1,
          complete: false,
          coordinates: [],
          bombedShips: 0
        },
        cruiser: {
          id: "single-ships-2",
          dataId: 2,
          name: "Крейсер",
          type: "cruiser",
          length: 3,
          count: 2,
          complete: false,
          coordinates: [],
          bombedShips: 0
        },
        destroyer: {
          id: "single-ships-3",
          dataId: 3,
          name: "Эсминец",
          type: "destroyer",
          length: 2,
          count: 3,
          complete: false,
          coordinates: [],
          bombedShips: 0
        },
        torpedo: {
          id: "single-ships-4",
          dataId: 4,
          name: "Торпедный катер",
          type: "torpedo",
          length: 1,
          count: 4,
          complete: false,
          coordinates: [],
          bombedShips: 0
        }
      }
    };

    addInStore(player);
  }

  checkInputs(element) {
    if (element.value.length > 0) {
      element.classList.contains("invalid") ? element.classList.remove("invalid") : '';
      element.classList.add("is-valid");
    } else if (element.value.length === 0) {
      element.classList.contains("is-valid") ? element.classList.remove("is-valid") : '';
      element.classList.add("invalid");
    }
  }

  nextStep() {
    const inputs = this.menuContainer.querySelectorAll("[data-bsp-sp-name-input]");
    let valid = false;

    inputs.forEach(element => {
      this.checkInputs(element);

      if (element.classList.contains("invalid")) {
        valid = false;
        return false;
      } else {
        valid = true;
      }
    });

    if (valid) {
      this.addPlayer();

      let bspSingleMenu = document.querySelector("[data-bsp-sp-menu]");

      if (bspSingleMenu) {
        bspSingleMenu.remove();
      }

      const template = `<div class="battleship-menu__add-ships add-ships-single" data-bsp-menu-add-ships>
                        <div class="add-ships-single__grid grid">
                            <ul class="grid__horizontal-coordinates">
                                  <li class="grid__coordinates-item">A</li>
                                  <li class="grid__coordinates-item">B</li>
                                  <li class="grid__coordinates-item">C</li>
                                  <li class="grid__coordinates-item">D</li>
                                  <li class="grid__coordinates-item">E</li>
                                  <li class="grid__coordinates-item">F</li>
                                  <li class="grid__coordinates-item">G</li>
                                  <li class="grid__coordinates-item">H</li>
                                  <li class="grid__coordinates-item">I</li>
                                  <li class="grid__coordinates-item">J</li>   
                            </ul>
                            <ul class="grid__vertical-coordinates">
                                <li class="grid__coordinates-item">1</li>
                                <li class="grid__coordinates-item">2</li>
                                <li class="grid__coordinates-item">3</li>
                                <li class="grid__coordinates-item">4</li>
                                <li class="grid__coordinates-item">5</li>
                                <li class="grid__coordinates-item">6</li>
                                <li class="grid__coordinates-item">7</li>
                                <li class="grid__coordinates-item">8</li>
                                <li class="grid__coordinates-item">9</li>
                                <li class="grid__coordinates-item">10</li>   
                            </ul>
                            <div class="grid__container" data-bsp-grid-container>
                              
                            </div>
                        </div>
                        
                        <div class="add-ships-single__ships" data-bsp-ships-indicators>
                        
                        </div>
                    </div>`;

      this.menuContainer.innerHTML = template;

      delete store.menuCls;
      store.addShipsCls = new SingleAddShips(10);
    }
  }
}

export default SinglePlayer;