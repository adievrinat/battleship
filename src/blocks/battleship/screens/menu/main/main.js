import menuList from "./menuList";

class CreateMain {
  constructor() {
    if (typeof CreateMain.instance === "object") {
      return CreateMain.instance;
    }

    this.container = document.querySelector("#battleship");
    this.template = `<main class="battleship-menu">
       <div class="battleship-menu__logo">South Park: Battleship</div>
      <div class="battleship-menu__container" data-bsp-menu-container>         
          <ul class="battleship-menu__main-menu bsp-main-menu" data-bsp-main-menu>
          </ul>
      </div>
      `;
    //добавляем шаблон меню без пунктов
    this.container.innerHTML = this.template;
    //находим контейнер для дальнейшего добавления туда пунктов меню
    this.menu = this.container.querySelector("[data-bsp-main-menu]");
    //формируем список пунктов меню и доблавям их в контейнер this.menu
    this.createListItems();

    CreateMain.instance = this;
    return this;
  }

  createListItems() {
    menuList.forEach(element => {
      let item = document.createElement(element.tag);

      item.classList.add(element.cls);
      item.addEventListener("click", element.click);
      item.innerText = element.content;

      this.menu.appendChild(item);
    });
  }
}

export default CreateMain;