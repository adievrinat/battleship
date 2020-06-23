import store from "./store/store";
import Preloader from "./screens/preloader/preloader";

class Game {
  constructor() {
    store.gameCls = this;

    this.preloader = new Preloader();
    this.startPreloader();

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