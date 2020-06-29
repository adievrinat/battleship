import addInStore from "../../../store/addInStore";
import SingleAddShips from "../../addShips/single/single";
import store from "../../../store/store";
import SinglePlayerForm from "./singlePlayerForm";
import template from "./addShipForm";

class SinglePlayer {
  constructor() {
    if (typeof SinglePlayer.instance === "object") {
      return SinglePlayer.instance;
    }

    this.player = {
      name: ''
    };
    this.menuContainer = document.querySelector("[data-bsp-menu-container]");
    this.mainMenu = document.querySelector("[data-bsp-main-menu]");

    new SinglePlayerForm(this.mainMenu, this.menuContainer, this.nextStep, this.player);
    // this.addForm();
    SinglePlayer.instance = this;
    return this;
  }

  nextStep() {
    const inputs = this.menuContainer.querySelectorAll("[data-bsp-sp-name-input]");
    let valid = false;
    const checkInputs = (element) => {
      if (element.value.length > 0) {
        element.classList.contains("invalid") ? element.classList.remove("invalid") : '';
        element.classList.add("is-valid");
      } else if (element.value.length === 0) {
        element.classList.contains("is-valid") ? element.classList.remove("is-valid") : '';
        element.classList.add("invalid");
      }
    };

    inputs.forEach(element => {
      checkInputs(element);

      if (element.classList.contains("invalid")) {
        valid = false;
        return false;
      } else {
        valid = true;
      }
    });

    const getPlayer = () => {
      return {
        name: this.player.name,
        winnings: 0,
        board: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
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
    };

    if (valid) {
      addInStore(getPlayer());

      let bspSingleMenu = document.querySelector("[data-bsp-sp-menu]");

      if (bspSingleMenu) {
        bspSingleMenu.remove();
      }

      this.menuContainer.innerHTML = template;

      delete store.menuCls;
      store.addShipsCls = new SingleAddShips(10);
    }
  }
}

export default SinglePlayer;