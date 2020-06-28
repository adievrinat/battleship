import store from "../../../store/store";

const addOpponent = () => {
  store.opponent = {
    ships: [],
    bombedAll: 0,
    winnings: 0
  };
};

export default addOpponent;