import store from "./store";

const addInStore = (object) => {
  if (store.player) {
    delete store.player;
  }

  store.player = object;
};

export default addInStore;