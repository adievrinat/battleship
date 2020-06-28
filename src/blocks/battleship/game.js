import store from "./store/store";
import Preloader from "./screens/preloader/preloader";
import CreateMain from "./screens/menu/main/main";
import SinglePlayerBattle from "./screens/battle/single/battle-single";

class Game {
  constructor() {
    store.gameCls = this;

    this.preloader = new Preloader();
    this.startPreloader();

    //временно без прелоадера
    store.menuCls = new CreateMain();
  }

  startPreloader() {
    // if (this.preloader !== undefined)
    //   this.preloader.start();
  }

  startSinglePlayerGame() {
    store.singleBattleCls = new SinglePlayerBattle();
    delete store.addShipsCls;
    delete store.singleCls;
    console.log(store);
  }
}

export default Game;