import store from "./store/store";
import Preloader from "./screens/preloader/preloader";
import CreateMain from "./screens/menu/main/main";

class Game {
  constructor() {
    store.gameCls = this;

    this.preloader = new Preloader();
    this.startPreloader();

    //временно без прелоадера
    // store.menuCls = new CreateMain();
  }

  startPreloader() {
    if (this.preloader !== undefined)
      this.preloader.start();
  }

  startSingleGame() {
    console.log("start single game");
    console.log(store);
  }
}

export default Game;