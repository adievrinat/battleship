import store from "../../../store/store";

const blockedAroundHorizontalShip = (type, ship, gridContainer) => {
  let shipLength = ship.length;
  let coordinates = ship.coordinates;
  let row = gridContainer.querySelectorAll("[data-bsp-grid-row]");

  let blocked = (rowInd, itmInd) => {
    row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].setAttribute("data-bsp-grid-row-disabled", true);

    if (!row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].classList.contains("blocked"))
      row[rowInd].querySelectorAll("[data-bsp-grid-item]")[itmInd].classList.add("blocked");
  };

  let addBlockedCoordinates = (rowIndex, itemIndex) => {
    let blockedObjCoordinates = { rowIndex: 0, itemIndex: 0 };

    blockedObjCoordinates.rowIndex = rowIndex;
    blockedObjCoordinates.itemIndex = itemIndex;
    coordinates[0].blockedCoordinates.push(blockedObjCoordinates);
  };

  if (type === "horizontal") {
    if (coordinates instanceof Array) {
      let rowIndex = coordinates[0].coordinates[0].rowIndex;
      let itemIndex = coordinates[0].coordinates[0].itemIndex;

      let itemIndex0 = itemIndex === 0;
      let itemIndex9 = itemIndex + shipLength - 1 === 9;

      if (rowIndex === 0) {
        if (itemIndex0) {
          store.player.board[rowIndex][itemIndex + shipLength] = 1;
          blocked(rowIndex, itemIndex + shipLength);
          addBlockedCoordinates(rowIndex, itemIndex + shipLength);

          for (var cr = itemIndex; cr <= shipLength; cr++) {
            blocked(rowIndex + 1, itemIndex + cr);
            store.player.board[rowIndex + 1][itemIndex + cr] = 1;
            addBlockedCoordinates(rowIndex + 1, itemIndex + cr);
          }
        }

        if (itemIndex9) {
          store.player.board[rowIndex][itemIndex - 1] = 1;
          blocked(rowIndex, itemIndex - 1);
          addBlockedCoordinates(rowIndex, itemIndex - 1);

          for (var pr = itemIndex; pr <= itemIndex + shipLength; pr++) {
            blocked(rowIndex + 1, pr - 1);
            store.player.board[rowIndex + 1][pr - 1] = 1;
            addBlockedCoordinates(rowIndex + 1, pr - 1);
          }
        }

        if (!itemIndex0 && !itemIndex9) {
          store.player.board[rowIndex][itemIndex + shipLength] = 1;
          store.player.board[rowIndex][itemIndex - 1] = 1;

          blocked(rowIndex, itemIndex + shipLength);
          blocked(rowIndex, itemIndex - 1);

          addBlockedCoordinates(rowIndex, itemIndex + shipLength);
          addBlockedCoordinates(rowIndex, itemIndex - 1);

          for (var tt = itemIndex; tt <= itemIndex + shipLength + 1; tt++) {
            blocked(rowIndex + 1, tt - 1);
            store.player.board[rowIndex + 1][tt - 1] = 1;
          }
        }

      } else if (rowIndex === 9) {
        if (itemIndex0) {
          store.player.board[rowIndex][itemIndex + shipLength] = 1;

          blocked(rowIndex, itemIndex + shipLength);

          addBlockedCoordinates(rowIndex, itemIndex + shipLength);

          for (var tr = itemIndex; tr <= shipLength; tr++) {
            blocked(rowIndex - 1, itemIndex + tr);
            store.player.board[rowIndex - 1][itemIndex + tr] = 1;
            addBlockedCoordinates(rowIndex - 1, itemIndex + tr);
          }
        }

        if (itemIndex9) {
          store.player.board[rowIndex][itemIndex - 1] = 1;

          blocked(rowIndex, itemIndex - 1);
          addBlockedCoordinates(rowIndex, itemIndex - 1);

          for (var er = itemIndex; er <= itemIndex + shipLength; er++) {
            blocked(rowIndex - 1, er - 1);
            store.player.board[rowIndex - 1][er - 1] = 1;
            addBlockedCoordinates(rowIndex - 1, er - 1);
          }
        }

        if (!itemIndex0 && !itemIndex9) {
          store.player.board[rowIndex][itemIndex + shipLength] = 1;
          store.player.board[rowIndex][itemIndex - 1] = 1;

          blocked(rowIndex, itemIndex + shipLength);
          blocked(rowIndex, itemIndex - 1);

          addBlockedCoordinates(rowIndex, itemIndex + shipLength);
          addBlockedCoordinates(rowIndex, itemIndex - 1);

          for (var sv = itemIndex; sv <= itemIndex + shipLength + 1; sv++) {
            blocked(rowIndex - 1, sv - 1);
            store.player.board[rowIndex - 1][sv - 1] = 1;
            addBlockedCoordinates(rowIndex - 1, sv - 1);
          }
        }

      } else if (rowIndex !== 0 && rowIndex !== 9) {

        if (itemIndex0) {
          //По левому краю
          store.player.board[rowIndex][itemIndex + shipLength] = 1;
          blocked(rowIndex, itemIndex + shipLength);
          addBlockedCoordinates(rowIndex, itemIndex + shipLength);

          for (var cc = itemIndex; cc <= shipLength; cc++) {
            blocked(rowIndex - 1, itemIndex + cc);
            store.player.board[rowIndex - 1][itemIndex + cc] = 1;
            addBlockedCoordinates(rowIndex - 1, itemIndex + cc);
          }

          for (var rr = itemIndex; rr <= shipLength; rr++) {
            blocked(rowIndex + 1, itemIndex + rr);
            store.player.board[rowIndex + 1][itemIndex + rr] = 1;
            addBlockedCoordinates(rowIndex + 1, itemIndex + rr);
          }
        }

        if (itemIndex9) {
          //По правому краю

          store.player.board[rowIndex][itemIndex - 1] = 1;
          blocked(rowIndex, itemIndex - 1);
          addBlockedCoordinates(rowIndex, itemIndex - 1);

          for (var ff = itemIndex; ff <= itemIndex + shipLength; ff++) {
            blocked(rowIndex - 1, ff - 1);
            store.player.board[rowIndex - 1][ff - 1] = 1;
            addBlockedCoordinates(rowIndex - 1, ff - 1);
          }

          for (var te = itemIndex; te <= itemIndex + shipLength; te++) {
            blocked(rowIndex + 1, te - 1);
            store.player.board[rowIndex + 1][te - 1] = 1;
            addBlockedCoordinates(rowIndex + 1, te - 1);
          }
        }

        if (!itemIndex0 && !itemIndex9) {
          store.player.board[rowIndex][itemIndex + shipLength] = 1;
          store.player.board[rowIndex][itemIndex - 1] = 1;

          blocked(rowIndex, itemIndex + shipLength);
          blocked(rowIndex, itemIndex - 1);

          addBlockedCoordinates(rowIndex, itemIndex + shipLength);
          addBlockedCoordinates(rowIndex, itemIndex - 1);

          for (var uu = itemIndex; uu <= itemIndex + shipLength + 1; uu++) {
            blocked(rowIndex - 1, uu - 1);
            store.player.board[rowIndex - 1][uu - 1] = 1;
            addBlockedCoordinates(rowIndex - 1, uu - 1);
          }

          for (var bh = itemIndex; bh <= itemIndex + shipLength + 1; bh++) {
            blocked(rowIndex + 1, bh - 1);
            store.player.board[rowIndex + 1][bh - 1] = 1;
            addBlockedCoordinates(rowIndex + 1, bh - 1);
          }
        }
      }
    }
  }

  console.log(store);
};

export default blockedAroundHorizontalShip;