class SinglePlayerForm {
  constructor(mainMenu, menuContainer, nextStep, player) {
    if (typeof SinglePlayerForm.instance === "object") {
      return SinglePlayerForm.instance;
    }

    this.mainMenu = mainMenu;
    this.menuContainer = menuContainer;
    this.nextStep = nextStep;
    this.player = player;
    this.addForm();

    SinglePlayerForm.instance = this;
    return this;
  }

  addName(e) {
    this.player.name = e.currentTarget.value;
  }

  addForm() {
    this.mainMenu.remove();

    let menu = document.createElement("div");
    menu.classList.add("battleship-menu__single-player-menu");
    menu.classList.add("bsp-menu");

    menu.setAttribute("data-bsp-sp-menu", "");

    let button = document.createElement("div");
    button.classList.add("bsp-menu__next");
    button.innerHTML = "Next";
    button.addEventListener("click", this.nextStep.bind(this));

    menu.appendChild(this.createInput("bsp-menu-single-name", "Enter your name", "BSP_SINGLE_NAME"));
    menu.appendChild(button);

    this.menuContainer.appendChild(menu);
  }

  createInput(id, labelText, name) {
    let formGroup = document.createElement("div");
    let labelName = document.createElement("label");
    let input = document.createElement("input");

    formGroup.classList.add("bsp-menu__form-group");

    labelName.setAttribute("for", id);
    labelName.innerText = labelText;

    input.setAttribute("type", "text");
    input.setAttribute("id", id);
    input.setAttribute("name", name);
    input.setAttribute("data-bsp-sp-name-input", "");
    input.setAttribute("required", "");
    input.addEventListener("input", (e) => {
      this.addName(e);
    });

    labelName.classList.add("bsp-menu__label");
    input.classList.add("bsp-menu__input");

    formGroup.appendChild(labelName);
    formGroup.appendChild(input);

    return formGroup;
  }
}

export default SinglePlayerForm;