import Battle from "../battle";
import SinglePlayerAddForm from "./addForm";

class SinglePlayerBattle extends Battle {
  constructor() {
    super();

    new SinglePlayerAddForm();
  }
}

export default SinglePlayerBattle;