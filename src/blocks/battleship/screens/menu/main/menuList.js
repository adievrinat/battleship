import singlePlayer from "../single/single";

const menuList = [
  {
    tag: "li",
    cls: "bsp-main-menu__item",
    click: singlePlayer.single,
    content: "Одиночная игра",
  },
  {
    tag: "li",
    cls: "bsp-main-menu__item",
    // click: menu.twoPlayers,
    content: "Игра с другом",
  },
  {
    tag: "li",
    cls: "bsp-main-menu__item",
    // click: menu.online,
    content: "Онлайн сражение",
  },
];

export default menuList;