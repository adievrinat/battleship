import SinglePlayer from "../single/single";
import store from "../../../store/store";

const menuList = [
  {
    tag: "li",
    cls: "bsp-main-menu__item",
    click: () => {
      store.singleCls = new SinglePlayer();
    },
    content: "Single Player",
  },
  {
    tag: "li",
    cls: "bsp-main-menu__item",
    // click: menu.twoPlayers,
    content: "Two Players",
  },
  {
    tag: "li",
    cls: "bsp-main-menu__item",
    // click: menu.online,
    content: "Online battle!",
  },
];

export default menuList;