const chess = document.querySelector("[data-chess]");

let board = [
  [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]
];

let boardProto = [
  ["ладья", "конь", "слон", "ферзь", "король", "слон", "конь", "ладья"], ["пешка", "пешка", "пешка", "пешка", "пешка", "пешка", "пешка", "пешка"], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0],
  ["пешка", "пешка", "пешка", "пешка", "пешка", "пешка", "пешка", "пешка"], ["ладья", "конь", "слон", "ферзь", "король", "слон", "конь", "ладья"]
];

let _warriors = [];
let _id = 0;
let _activeWarrior = null;

//шаг война на доске
let step = (nextRowIndex, nextItemIndex, nextColor) => {
  board[_activeWarrior.position.rowIndex][_activeWarrior.position.itemIndex] = 0;
  logics.variables.activeGridItem = [nextRowIndex, nextItemIndex];

  board[nextRowIndex][nextItemIndex] = 1;

  document.querySelectorAll(".table__grid-row")[nextRowIndex].querySelectorAll(".table__grid-item")[nextItemIndex].setAttribute("data-grid-item-clear", false);

  document.querySelectorAll(".table__grid-row")[_activeWarrior.position.rowIndex].querySelectorAll(".table__grid-item")[_activeWarrior.position.itemIndex].setAttribute("data-grid-item-clear", true);

  document.querySelectorAll(".table__grid-row")[nextRowIndex].querySelectorAll(".table__grid-item")[nextItemIndex].appendChild(logics.variables.activeWarrior);

  logics.variables.activeWarrior.setAttribute("data-warrior-row", nextRowIndex);
  logics.variables.activeWarrior.setAttribute("data-warrior-item", nextItemIndex);
  logics.variables.activeWarrior.setAttribute("data-warrior-active", false);
  logics.variables.activeWarrior.classList.remove("table__warrior_active");

  _warriors[_activeWarrior.id].active = false;
  _warriors[_activeWarrior.id].startPosition = false;
  _warriors[_activeWarrior.id].position.rowIndex = nextRowIndex;
  _warriors[_activeWarrior.id].position.itemIndex = nextItemIndex;
  _activeWarrior = null;
  logics.variables.activeWarriorType = '';
  logics.variables.activeWarrior = '';
  logics.variables.activeGridItem = '';
  logics.variables.activeColor = nextColor;
};

let warriorsBehaviour = {
  steps() {
    return [
      [board[0][0], board[0][1], board[0][2], board[0][3], board[0][4], board[0][5], board[0][6], board[0][7]],
      [board[1][0], board[1][1], board[1][2], board[1][3], board[1][4], board[1][5], board[1][6], board[1][7]],
      [board[2][0], board[2][1], board[2][2], board[2][3], board[2][4], board[2][5], board[2][6], board[2][7]],
      [board[3][0], board[3][1], board[3][2], board[3][3], board[3][4], board[3][5], board[3][6], board[3][7]],
      [board[4][0], board[4][1], board[4][2], board[4][3], board[4][4], board[4][5], board[4][6], board[4][7]],
      [board[5][0], board[5][1], board[5][2], board[5][3], board[5][4], board[5][5], board[5][6], board[5][7]],
      [board[6][0], board[6][1], board[6][2], board[6][3], board[6][4], board[6][5], board[6][6], board[6][7]],
      [board[7][0], board[7][1], board[7][2], board[7][3], board[7][4], board[7][5], board[7][6], board[7][7]],
    ];
  },
  pawn(nextRowIndex, nextItemIndex) {
    let steps = this.steps();

    if (_activeWarrior.color === "white" && logics.variables.activeColor === "white") {
      //формирование новой матрицы с возможными ходами
      if (_activeWarrior.position.rowIndex === 0 || board[_activeWarrior.position.rowIndex - 1][_activeWarrior.position.itemIndex]) {
        return false;
      }

      if (_activeWarrior.startPosition) {
        let futureRowIndex = _activeWarrior.position.rowIndex - 2;

        steps[futureRowIndex][_activeWarrior.position.itemIndex] = "ход";
      }

      if (_activeWarrior.position.rowIndex > 0) {
        let futureRowIndex = _activeWarrior.position.rowIndex - 1;

        steps[futureRowIndex][_activeWarrior.position.itemIndex] = "ход";
      }

      //ход
      if (typeof steps[nextRowIndex][nextItemIndex] === "string" && steps[nextRowIndex][nextItemIndex] === "ход") {
        step(nextRowIndex, nextItemIndex, "dark");

        return;
      }
    }

    if (_activeWarrior.color === "dark") {
      console.log("dark");

      console.log(steps);
    }
  },
  castle() {
    console.log("Логика ладьи");
  },
  knight() {
    console.log("Логика коня");

  },
  elephant() {
    console.log("Логика слона");

  },
  queen() {
    console.log("Логика ферзя");

  },
  king() {
    console.log("Логика короля");

  }
};

let logics = {
  variables: {
    table: chess.querySelector("[data-table]"),
    rows: chess.querySelectorAll("[data-grid-row]"),
    itemWhite: "data-grid-item-white",
    itemDark: "data-grid-item-dark",
    darkActiveRow: [0, 1],
    whiteActiveRow: [6, 7],
    activeColor: 'white',
    activeWarriorType: '',
    activeWarrior: '',
    activeGridItem: ''
  },

  addWarriors() {
    boardProto[this.variables.darkActiveRow[0]].forEach((element, index, array) => {
      this.addWarrior(element, this.variables.darkActiveRow[0], index, "dark");
    });

    boardProto[this.variables.darkActiveRow[1]].forEach((element, index, array) => {
      this.addWarrior(element, this.variables.darkActiveRow[1], index, "dark");
    });

    boardProto[this.variables.whiteActiveRow[0]].forEach((element, index, array) => {
      this.addWarrior(element, this.variables.whiteActiveRow[0], index, "white");
    });

    boardProto[this.variables.whiteActiveRow[1]].forEach((element, index, array) => {
      this.addWarrior(element, this.variables.whiteActiveRow[1], index, "white");
    });

    this.movement();
  },

  addWarrior(type, activeRow, indexWarrior, color) {
    let row = this.variables.rows[activeRow];
    let items = row.querySelectorAll("[data-grid-item]");

    items[indexWarrior].setAttribute("data-grid-item-clear", "false");

    let newWarrior = {
      div() {
        let div = document.createElement("div");

        div.classList.add("table__warrior");
        div.setAttribute("data-warrior", '');
        div.setAttribute("data-warrior-id", String(_id));
        div.setAttribute("data-warrior-color", color);
        div.setAttribute("data-warrior-row", items[indexWarrior].getAttribute("data-grid-row-index"));
        div.setAttribute("data-warrior-item", items[indexWarrior].getAttribute("data-grid-item-index"));
        div.innerHTML += type;

        let objectWarrior = {
          id: _id,
          name: type,
          type: type,
          color: color,
          position: {
            rowIndex: Number(items[indexWarrior].getAttribute("data-grid-row-index")),
            itemIndex: Number(items[indexWarrior].getAttribute("data-grid-item-index"))
          },
          active: false,
          startPosition: true
        };

        _warriors.push(objectWarrior);

        div.addEventListener("click", () => {
          this.activation(div, objectWarrior.id, color);
        });

        ++_id;

        return div;
      },
      name: type,
      type: type,
      rowNumber: items[indexWarrior].getAttribute("data-grid-row-index"), // индекс row в которой будет находиться фигура
      indexNumber: items[indexWarrior].getAttribute("data-grid-item-index"), // индекс item в котором будет находиться фигура
      activation(warrior, id, color) {
        if (color === logics.variables.activeColor) {
          const activeWarriorClass = "table__warrior_active";

          //удаляем активацию со всех элементов
          document.querySelectorAll("." + activeWarriorClass).forEach(element => {
            element.classList.remove(activeWarriorClass);
            element.setAttribute("data-warrior-active", false);
          });

          //добавляем активацию на выбранный элемент
          warrior.setAttribute("data-warrior-active", true);

          if (!warrior.classList.contains(activeWarriorClass))
            warrior.classList.add(activeWarriorClass);

          logics.variables.activeWarriorType = type;
          logics.variables.activeWarrior = warrior;

          let atvRow = Number(warrior.parentElement.getAttribute("data-grid-row-index"));
          let activeItem = Number(warrior.parentElement.getAttribute("data-grid-item-index"));
          logics.variables.activeGridItem = [atvRow, activeItem];

          if (typeof id === "number") {
            _warriors.forEach(element => {
              if (element.id === id && typeof element.id === "number") {
                element.active = true;
                _activeWarrior = element;
              } else if (typeof element.id === "number") {
                element.active = false;
              }
            });
          } else {
            alert("error type id _warrior");
          }
        }
      },
    };

    items[indexWarrior].appendChild(newWarrior.div());
  },

  movement() {
    //ходьба фигурой
    let gridItems = document.querySelectorAll("[data-grid-item]");

    gridItems.forEach(element => {
      element.addEventListener("click", function () {
        if (!element.childNodes.length && _activeWarrior !== null) { //проверяем пустая ли клетка
          let attribute = this.getAttribute("data-grid-item-clear") === "true" ? true : false;
          let thisRow = Number(this.getAttribute("data-grid-row-index"));
          let thisItem = Number(this.getAttribute("data-grid-item-index"));

          //проверяем клетку на пустоту, матрицу и что выбранный войн - объект(дом эл.)
          if (attribute && board[thisRow][thisItem] === 0 && typeof logics.variables.activeWarrior === "object") {
            switch (_activeWarrior.type) {
              case "пешка":
                warriorsBehaviour.pawn(thisRow, thisItem);
                break;
              case "ладья":
                warriorsBehaviour.castle();
                break;
              case "конь":
                warriorsBehaviour.knight();
                break;
              case "слон":
                warriorsBehaviour.elephant();
                break;
              case "ферзь":
                warriorsBehaviour.queen();
                break;
              case "король":
                warriorsBehaviour.king();
                break;
              default:
                alert("_activeWarrior dont have type");
            }
          }
        }
      });
    });
  },

  init() {
    this.addWarriors();
  }
};

logics.init();