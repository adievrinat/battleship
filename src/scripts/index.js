import '../styles/index.scss';

import Header from '../blocks/header/header';
// import '../blocks/chess/chess';
import Game from "../blocks/battleship/game";
import Preloader from "../blocks/battleship/screens/preloader/preloader";
// import generateIndexPage from "./pages/index";

(function () {
  class Constructor {
    constructor() {
      window.addEventListener('load', this.load.bind(this));
    }

    load() {
      // generateIndexPage();
      this.logics();
    }

    logics() {
      new Header();
      // new Preloader();
      new Game();
      // new Menu();
    }
  }

  new Constructor();
})();
