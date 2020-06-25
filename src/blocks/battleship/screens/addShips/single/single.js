import store from "../../../store/store";

class SingleAddShips {
  constructor(shipsCount) {
    if (typeof SingleAddShips.instance === "object") {
      return SingleAddShips.instance;
    }

    this.state = {
      shipsCount: shipsCount,
      activeTypeShips: null,
      orientation: "horizontal"
    };

    this.addShipsContainer = document.querySelector("[data-bsp-menu-add-ships]");
    this.gridContainer = this.addShipsContainer.querySelector("[data-bsp-grid-container]");
    this.shipsIndicators = this.addShipsContainer.querySelector("[data-bsp-ships-indicators]");

    this.addGrid();
    this.addForm();

    SingleAddShips.instance = this;
    return this;
  }

  addGrid() {
    let count = 10;

    let createItem = (index, rowIndex) => {
      let item = document.createElement("div");
      item.classList.add("grid__row-item");
      item.setAttribute("data-bsp-grid-item-index", index);
      item.setAttribute("data-bsp-grid-row-index", rowIndex);
      item.setAttribute("data-bsp-grid-row-disabled", "false");
      item.setAttribute("data-bsp-grid-item", "");
      item.addEventListener("click", this.addShips.bind(this));
      return item;
    };

    let createRow = (rowIndex) => {
      let row = document.createElement("div");
      row.classList.add("grid__row");
      row.setAttribute("data-bsp-grid-row", "");

      for (var i = 0; i < count; i++) {
        row.appendChild(createItem(i, rowIndex));
      }

      return row;
    };

    for (var r = 0; r < count; r++) {
      this.gridContainer.appendChild(createRow(r));
    }
  }

  addForm() {
    if (store.player.ships) {
      let createInput = (id, labelText, countShips, shipsType) => {
        let formGroup = document.createElement("div");
        let label = document.createElement("label");
        let input = document.createElement("input");
        let count = document.createElement("div");

        formGroup.classList.add("add-ships-single__form-group");
        formGroup.setAttribute("data-ship-type", shipsType);
        formGroup.setAttribute("data-bsp-indicator-form-group", "");

        label.classList.add("add-ships-single__label");
        label.setAttribute("for", id);
        // label.innerText = labelText;

        input.classList.add("add-ships-single__input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", id);
        input.setAttribute("name", "TYPE_SHIPS");
        input.setAttribute("data-ship-type", shipsType);

        let $this = this;
        input.addEventListener("click", this.activeTypeShips.bind($this));

        count.classList.add("add-ships-single__count");
        count.innerText = countShips;

        formGroup.appendChild(input);
        formGroup.appendChild(label);
        formGroup.appendChild(count);

        return formGroup;
      };

      let hi = document.createElement("h2");
      let description = document.createElement("div");
      let form = document.createElement("div");

      hi.innerText = "Hi, " + store.player.name + "!";
      description.innerText = "Choose your ship type";
      description.style.margin = "0 0 40px 0";

      form.classList.add("add-ships-single__form");

      form.appendChild(createInput(store.player.ships.battleship.id, store.player.ships.battleship.name, store.player.ships.battleship.count, store.player.ships.battleship.type));
      form.appendChild(createInput(store.player.ships.cruiser.id, store.player.ships.cruiser.name, store.player.ships.cruiser.count, store.player.ships.cruiser.type));
      form.appendChild(createInput(store.player.ships.destroyer.id, store.player.ships.destroyer.name, store.player.ships.destroyer.count, store.player.ships.destroyer.type));
      form.appendChild(createInput(store.player.ships.torpedo.id, store.player.ships.torpedo.name, store.player.ships.torpedo.count, store.player.ships.torpedo.type));

      let changeOrientation = document.createElement("div");
      changeOrientation.classList.add("add-ships-single__change-orientation");
      changeOrientation.innerText = "change orientation";
      changeOrientation.addEventListener("click", this.changeOrientation.bind(this));

      let orientation = document.createElement("div");
      orientation.classList.add("add-ships-single__ships-orientation");
      orientation.setAttribute("data-bsp-single-ships-orientation", "");
      orientation.innerText = this.state.orientation;

      this.shipsIndicators.appendChild(hi);
      this.shipsIndicators.appendChild(description);
      this.shipsIndicators.appendChild(form);
      this.shipsIndicators.appendChild(changeOrientation);
      this.shipsIndicators.appendChild(orientation);
    }
  }

  changeOrientation() {
    if (this.state.orientation === "horizontal") {
      this.state.orientation = "vertical";
    } else if (this.state.orientation === "vertical") {
      this.state.orientation = "horizontal";
    }

    document.querySelector("[data-bsp-single-ships-orientation]").innerHTML = this.state.orientation;
  }

  activeTypeShips(e) {
    let activeTypeShips = e.currentTarget.attributes[4].value;
    let row = this.gridContainer.querySelectorAll("[data-bsp-grid-row]");

    row.forEach(element => {
      if (this.state.activeTypeShips !== null && this.state.activeTypeShips !== undefined) {
        if (element.classList.contains(this.state.activeTypeShips))
          element.classList.remove(this.state.activeTypeShips);
      }

      element.classList.add(activeTypeShips);
    });

    this.state.activeTypeShips = activeTypeShips;
  }

  addShips(e) {
    switch (this.state.activeTypeShips) {
      case "battleship":
        this.addShip(e.currentTarget, store.player.ships.battleship, "battleship");
        break;
      case "cruiser":
        this.addShip(e.currentTarget, store.player.ships.cruiser, "cruiser");
        break;
      case "destroyer":
        this.addShip(e.currentTarget, store.player.ships.destroyer, "destroyer");
        break;
      case "torpedo":
        this.addShip(e.currentTarget, store.player.ships.torpedo, "torpedo");
        break;
      case null:
        alert("Выберите тип корабля");
        break;
      default:
        alert("В");
    }
  }

  addShip(element, storeShip, clsItem) {
    let type = this.state.orientation;
    let rowIndex = +element.getAttribute("data-bsp-grid-row-index");
    let itemIndex = +element.getAttribute("data-bsp-grid-item-index");

    // storeShip.coordinates = [];

    if (storeShip.count !== 0 && storeShip.count > 0) {
      //Проверяем тип корабля и что корабль не выходит за пределы сетки (точка + длинная корабля)
      this.addShipHorizontal(type, rowIndex, itemIndex, storeShip, clsItem);

      this.addShipVertical(type, rowIndex, itemIndex, storeShip, clsItem);
    }
  }

  addShipHorizontal(type, rowIndex, itemIndex, storeShip, clsItem) {
    if (type === "horizontal" && itemIndex + storeShip.length - 1 < 10) {

      if (store.player.board[rowIndex][itemIndex] === 0) {

        //Перед добавлением нужно проверить будет ли заходить корабль своими частями на занятые места
        for (var c = 0; c < storeShip.length; c++) {
          if (store.player.board[rowIndex][itemIndex + c] === 1) {
            alert('Здесь нельзя строить!');
            return;
          }
        }

        let coordinatesArr = [];

        for (var p = 0; p < storeShip.length; p++) {
          //заполняем матрицу
          store.player.board[rowIndex][itemIndex + p] = 1;
          storeShip.complete = true;

          //добавляем координаты корабля
          let coordinate = { rowIndex: rowIndex, itemIndex: itemIndex + p };
          coordinatesArr.push(coordinate);

          //DOM элементы
          let row = this.gridContainer.querySelectorAll("[data-bsp-grid-row]")[rowIndex];
          let item = row.querySelectorAll("[data-bsp-grid-item]")[itemIndex + p];
          item.setAttribute("data-bsp-grid-row-disabled", true);
          item.classList.add(clsItem);
        }
        //кол-во кораблей станивится на единицу меньше
        --storeShip.count;
        --this.state.shipsCount;

        //доблавяем координаты в конец массива
        storeShip.coordinates.unshift(coordinatesArr);

        //блокируем клетки возле корабля
        this.blockedAroundHorizontalShip(type, storeShip);

        //если все корабли данного типа добавлены, удаляем цвет ховера и запрещаем выбор данного типа
        if (storeShip.count === 0) {
          this.gridContainer.querySelectorAll("[data-bsp-grid-row]").forEach(element => {
            element.classList.contains(storeShip.type) ? element.classList.remove(storeShip.type) : '';
          });

          this.shipsIndicators.querySelectorAll("[data-bsp-indicator-form-group]").forEach(element => {
            if (element.getAttribute("data-ship-type") === this.state.activeTypeShips) {
              let input = element.querySelector("input");
              let label = element.querySelector("label");
              input.checked = false;
              input.style.display = "none";
              label.style.pointerEvents = "none";
              label.classList.add("complete");

              storeShip.complete = true;

              if (this.state.shipsCount !== 0) {
                this.state.activeTypeShips = null;
              } else {
                //!!! ВСЕ КОРАБЛИ ДОБАВЛЕНЫ
                this.state.activeTypeShips = "complete";
                //добавляем кнопку Играть
                let startGame = document.createElement("div");
                startGame.classList.add("add-ships-single__start");
                startGame.innerText = "GO";
                startGame.addEventListener("click", store.gameCls.startSingleGame);
                this.shipsIndicators.appendChild(startGame);
              }
            }
          });

          console.log(this.state.activeTypeShips);
        }
      }
    }
  }

  addShipVertical(type, rowIndex, itemIndex, storeShip, clsItem) {
    if (type === "vertical" && rowIndex + storeShip.length - 1 < 10) {
      if (store.player.board[rowIndex][itemIndex] === 0) {

        //Перед добавлением нужно проверить будет ли заходить корабль своими частями на занятые места
        for (var op = 0; op < storeShip.length; op++) {
          if (store.player.board[rowIndex + op][itemIndex] === 1) {
            alert('Здесь нельзя строить!');
            return;
          }
        }

        let coordinatesArr = [];

        for (var cr = 0; cr < storeShip.length; cr++) {
          //заполняем матрицу
          store.player.board[rowIndex + cr][itemIndex] = 1;
          storeShip.complete = true;

          //добавляем координаты корабля
          let coordinate = { rowIndex: rowIndex + cr, itemIndex: itemIndex };
          coordinatesArr.push(coordinate);

          //DOM элементы
          let row = this.gridContainer.querySelectorAll("[data-bsp-grid-row]")[rowIndex + cr];
          let item = row.querySelectorAll("[data-bsp-grid-item]")[itemIndex];
          item.setAttribute("data-bsp-grid-row-disabled", true);
          item.classList.add(clsItem);
        }

        //кол-во кораблей станивится на единицу меньше
        --storeShip.count;
        --this.state.shipsCount;

        //доблавяем координаты в конец массива
        storeShip.coordinates.unshift(coordinatesArr);

        //блокируем клетки возле корабля
        this.blockedAroundVerticalShip(type, storeShip);

        //если все корабли данного типа добавлены, удаляем цвет ховера и запрещаем выбор данного типа
        if (storeShip.count === 0) {
          this.gridContainer.querySelectorAll("[data-bsp-grid-row]").forEach(element => {
            element.classList.contains(storeShip.type) ? element.classList.remove(storeShip.type) : '';
          });

          this.shipsIndicators.querySelectorAll("[data-bsp-indicator-form-group]").forEach(element => {
            if (element.getAttribute("data-ship-type") === this.state.activeTypeShips) {
              let input = element.querySelector("input");
              let label = element.querySelector("label");
              input.checked = false;
              input.style.display = "none";
              label.style.pointerEvents = "none";
              label.classList.add("complete");

              storeShip.complete = true;

              if (this.state.shipsCount !== 0) {
                this.state.activeTypeShips = null;
              } else {
                //!!! ВСЕ КОРАБЛИ ДОБАВЛЕНЫ
                this.state.activeTypeShips = "complete";
                //добавляем кнопку Играть
                let startGame = document.createElement("div");
                startGame.classList.add("add-ships-single__start");
                startGame.innerText = "GO";
                startGame.addEventListener("click", store.gameCls.startSingleGame);
                this.shipsIndicators.appendChild(startGame);
              }
            }
          });
          console.log(store.player);
        }
      }
    }
  }

  blockedAroundHorizontalShip(type, ship) {
    let shipLength = ship.length;
    let coordinates = ship.coordinates;
    let row = this.gridContainer.querySelectorAll("[data-bsp-grid-row]");

    let blocked = (rowInd, itmInd) => {
      row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].setAttribute("data-bsp-grid-row-disabled", true);

      if (!row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].classList.contains("blocked"))
        row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].classList.add("blocked");
    };

    if (type === "horizontal") {
      if (coordinates instanceof Array) {
        let rowIndex = coordinates[0][0].rowIndex;
        let itemIndex = coordinates[0][0].itemIndex;

        let itemIndex0 = itemIndex === 0;
        let itemIndex9 = itemIndex + shipLength - 1 === 9;

        if (rowIndex === 0) {
          if (itemIndex0) {
            store.player.board[rowIndex][itemIndex + shipLength] = 1;
            blocked(rowIndex, itemIndex + shipLength);

            for (var cr = itemIndex; cr <= shipLength; cr++) {
              blocked(rowIndex + 1, itemIndex + cr);
              store.player.board[rowIndex + 1][itemIndex + cr] = 1;
            }
          }

          if (itemIndex9) {
            store.player.board[rowIndex][itemIndex - 1] = 1;
            blocked(rowIndex, itemIndex - 1);

            for (var pr = itemIndex; pr <= itemIndex + shipLength; pr++) {
              blocked(rowIndex + 1, pr - 1);
              store.player.board[rowIndex + 1][pr - 1] = 1;
            }
          }

          if (!itemIndex0 && !itemIndex9) {
            store.player.board[rowIndex][itemIndex + shipLength] = 1;
            store.player.board[rowIndex][itemIndex - 1] = 1;

            blocked(rowIndex, itemIndex + shipLength);
            blocked(rowIndex, itemIndex - 1);

            for (var tt = itemIndex; tt <= itemIndex + shipLength + 1; tt++) {
              blocked(rowIndex + 1, tt - 1);
              store.player.board[rowIndex + 1][tt - 1] = 1;
            }
          }

        } else if (rowIndex === 9) {
          if (itemIndex0) {
            store.player.board[rowIndex][itemIndex + shipLength] = 1;

            blocked(rowIndex, itemIndex + shipLength);

            for (var tr = itemIndex; tr <= shipLength; tr++) {
              blocked(rowIndex - 1, itemIndex + tr);
              store.player.board[rowIndex - 1][itemIndex + tr] = 1;
            }
          }

          if (itemIndex9) {
            store.player.board[rowIndex][itemIndex - 1] = 1;

            blocked(rowIndex, itemIndex - 1);

            for (var er = itemIndex; er <= itemIndex + shipLength; er++) {
              blocked(rowIndex - 1, er - 1);
              store.player.board[rowIndex - 1][er - 1] = 1;
            }
          }

          if (!itemIndex0 && !itemIndex9) {
            store.player.board[rowIndex][itemIndex + shipLength] = 1;
            store.player.board[rowIndex][itemIndex - 1] = 1;

            blocked(rowIndex, itemIndex + shipLength);
            blocked(rowIndex, itemIndex - 1);

            for (var sv = itemIndex; sv <= itemIndex + shipLength + 1; sv++) {
              blocked(rowIndex - 1, sv - 1);
              store.player.board[rowIndex - 1][sv - 1] = 1;
            }
          }

        } else if (rowIndex !== 0 && rowIndex !== 9) {

          if (itemIndex0) {
            //По левому краю
            store.player.board[rowIndex][itemIndex + shipLength] = 1;
            blocked(rowIndex, itemIndex + shipLength);

            for (var cc = itemIndex; cc <= shipLength; cc++) {
              blocked(rowIndex - 1, itemIndex + cc);
              store.player.board[rowIndex - 1][itemIndex + cc] = 1;
            }

            for (var rr = itemIndex; rr <= shipLength; rr++) {
              blocked(rowIndex + 1, itemIndex + rr);
              store.player.board[rowIndex + 1][itemIndex + rr] = 1;
            }
          }

          if (itemIndex9) {
            //По правому краю

            store.player.board[rowIndex][itemIndex - 1] = 1;
            blocked(rowIndex, itemIndex - 1);

            for (var ff = itemIndex; ff <= itemIndex + shipLength; ff++) {
              blocked(rowIndex - 1, ff - 1);
              store.player.board[rowIndex - 1][ff - 1] = 1;
            }

            for (var te = itemIndex; te <= itemIndex + shipLength; te++) {
              blocked(rowIndex + 1, te - 1);
              store.player.board[rowIndex + 1][te - 1] = 1;
            }
          }

          if (!itemIndex0 && !itemIndex9) {
            store.player.board[rowIndex][itemIndex + shipLength] = 1;
            store.player.board[rowIndex][itemIndex - 1] = 1;

            blocked(rowIndex, itemIndex + shipLength);
            blocked(rowIndex, itemIndex - 1);

            for (var uu = itemIndex; uu <= itemIndex + shipLength + 1; uu++) {
              blocked(rowIndex - 1, uu - 1);
              store.player.board[rowIndex - 1][uu - 1] = 1;
            }

            for (var bh = itemIndex; bh <= itemIndex + shipLength + 1; bh++) {
              blocked(rowIndex + 1, bh - 1);
              store.player.board[rowIndex + 1][bh - 1] = 1;
            }
          }
        }
      }
    }

    console.log(store.player);
  };

  blockedAroundVerticalShip(type, ship) {
    let shipLength = ship.length;
    let coordinates = ship.coordinates;
    let row = this.gridContainer.querySelectorAll("[data-bsp-grid-row]");

    let blocked = (rowInd, itmInd) => {
      row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].setAttribute("data-bsp-grid-row-disabled", true);

      if (!row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].classList.contains("blocked"))
        row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].classList.add("blocked");
    };

    if (type === "vertical") {
      if (coordinates instanceof Array) {
        let rowIndex = coordinates[0][0].rowIndex;
        let itemIndex = coordinates[0][0].itemIndex;

        let itemIndex0 = itemIndex === 0;
        let itemIndex9 = itemIndex === 9;

        if (rowIndex === 0) {
          if (itemIndex0) {
            store.player.board[rowIndex + shipLength][itemIndex] = 1;
            blocked(rowIndex + shipLength, itemIndex);

            for (var zz = rowIndex; zz <= shipLength; zz++) {
              blocked(rowIndex + zz, itemIndex + 1);
              store.player.board[rowIndex + zz][itemIndex + 1] = 1;
            }
          }

          if (itemIndex9) {
            store.player.board[rowIndex + shipLength][itemIndex] = 1;

            blocked(rowIndex + shipLength, itemIndex);

            for (var yt = rowIndex; yt <= rowIndex + shipLength; yt++) {
              blocked(yt, itemIndex - 1);
              store.player.board[yt][itemIndex - 1] = 1;
            }
          }

          if (!itemIndex0 && !itemIndex9) {
            store.player.board[rowIndex + shipLength][itemIndex] = 1;
            blocked(rowIndex + shipLength, itemIndex);

            for (var szt = rowIndex; szt <= rowIndex + shipLength; szt++) {
              blocked(szt, itemIndex - 1);
              store.player.board[szt][itemIndex - 1] = 1;
            }

            for (var sztc = rowIndex; sztc <= rowIndex + shipLength; sztc++) {
              blocked(sztc, itemIndex + 1);
              store.player.board[sztc][itemIndex + 1] = 1;
            }
          }

        } else if (rowIndex + shipLength - 1 === 9) {
          if (itemIndex0) {
            store.player.board[rowIndex - 1][itemIndex] = 1;
            blocked(rowIndex - 1, itemIndex);

            for (var xx = rowIndex - 1; xx <= rowIndex - 1 + shipLength; xx++) {
              blocked(xx, itemIndex + 1);
              store.player.board[xx][itemIndex + 1] = 1;
            }
          }

          if (itemIndex9) {
            store.player.board[rowIndex - 1][itemIndex] = 1;
            blocked(rowIndex - 1, itemIndex);

            for (var xxv = rowIndex - 1; xxv <= rowIndex - 1 + shipLength; xxv++) {
              blocked(xxv, itemIndex - 1);
              store.player.board[xxv][itemIndex - 1] = 1;
            }
          }

          if (!itemIndex0 && !itemIndex9) {
            store.player.board[rowIndex - 1][itemIndex] = 1;
            blocked(rowIndex - 1, itemIndex);

            for (var xxl = rowIndex - 1; xxl <= rowIndex - 1 + shipLength; xxl++) {
              blocked(xxl, itemIndex + 1);
              store.player.board[xxl][itemIndex + 1] = 1;
            }

            for (var xxm = rowIndex - 1; xxm <= rowIndex - 1 + shipLength; xxm++) {
              blocked(xxm, itemIndex - 1);
              store.player.board[xxm][itemIndex - 1] = 1;
            }
          }

        } else if (rowIndex !== 0 && rowIndex + shipLength - 1 !== 9) {
          if (itemIndex0) {
            //По левому краю
            store.player.board[rowIndex + shipLength][itemIndex] = 1;
            blocked(rowIndex + shipLength, itemIndex);

            store.player.board[rowIndex - 1][itemIndex] = 1;
            blocked(rowIndex - 1, itemIndex);

            for (var zzc = rowIndex - 1; zzc <= rowIndex + shipLength; zzc++) {
              blocked(zzc, itemIndex + 1);
              store.player.board[zzc][itemIndex + 1] = 1;
            }
          }

          if (itemIndex9) {
            //По правому краю
            store.player.board[rowIndex + shipLength][itemIndex] = 1;
            blocked(rowIndex + shipLength, itemIndex);

            store.player.board[rowIndex - 1][itemIndex] = 1;
            blocked(rowIndex - 1, itemIndex);

            for (var zzcx = rowIndex - 1; zzcx <= rowIndex + shipLength; zzcx++) {
              blocked(zzcx, itemIndex - 1);
              store.player.board[zzcx][itemIndex - 1] = 1;
            }
          }

          if (!itemIndex0 && !itemIndex9) {
            store.player.board[rowIndex + shipLength][itemIndex] = 1;
            blocked(rowIndex + shipLength, itemIndex);

            store.player.board[rowIndex - 1][itemIndex] = 1;
            blocked(rowIndex - 1, itemIndex);

            for (var tttt = rowIndex - 1; tttt <= rowIndex + shipLength; tttt++) {
              blocked(tttt, itemIndex + 1);
              store.player.board[tttt][itemIndex + 1] = 1;
            }

            for (var cccc = rowIndex - 1; cccc <= rowIndex + shipLength; cccc++) {
              blocked(cccc, itemIndex - 1);
              store.player.board[cccc][itemIndex - 1] = 1;
            }
          }
        }
      }
    }
  };
}

export default SingleAddShips;