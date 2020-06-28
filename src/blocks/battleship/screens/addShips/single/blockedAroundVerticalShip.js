import store from "../../../store/store";

const blockedAroundVerticalShip = (type, ship, gridContainer) => {
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

  if (type === "vertical") {
    if (coordinates instanceof Array) {
      let rowIndex = coordinates[0].coordinates[0].rowIndex;
      let itemIndex = coordinates[0].coordinates[0].itemIndex;

      let itemIndex0 = itemIndex === 0;
      let itemIndex9 = itemIndex === 9;

      if (rowIndex === 0) {
        if (itemIndex0) {
          store.player.board[rowIndex + shipLength][itemIndex] = 1;
          blocked(rowIndex + shipLength, itemIndex);
          addBlockedCoordinates(rowIndex + shipLength, itemIndex);

          for (var zz = rowIndex; zz <= shipLength; zz++) {
            blocked(rowIndex + zz, itemIndex + 1);
            store.player.board[rowIndex + zz][itemIndex + 1] = 1;
            addBlockedCoordinates(rowIndex + zz, itemIndex + 1);
          }
        }

        if (itemIndex9) {
          store.player.board[rowIndex + shipLength][itemIndex] = 1;

          blocked(rowIndex + shipLength, itemIndex);

          addBlockedCoordinates(rowIndex + shipLength, itemIndex);

          for (var yt = rowIndex; yt <= rowIndex + shipLength; yt++) {
            blocked(yt, itemIndex - 1);
            store.player.board[yt][itemIndex - 1] = 1;
            addBlockedCoordinates(yt, itemIndex - 1);
          }
        }

        if (!itemIndex0 && !itemIndex9) {
          store.player.board[rowIndex + shipLength][itemIndex] = 1;
          blocked(rowIndex + shipLength, itemIndex);
          addBlockedCoordinates(rowIndex + shipLength, itemIndex);

          for (var szt = rowIndex; szt <= rowIndex + shipLength; szt++) {
            blocked(szt, itemIndex - 1);
            store.player.board[szt][itemIndex - 1] = 1;
            addBlockedCoordinates(szt, itemIndex - 1);
          }

          for (var sztc = rowIndex; sztc <= rowIndex + shipLength; sztc++) {
            blocked(sztc, itemIndex + 1);
            store.player.board[sztc][itemIndex + 1] = 1;
            addBlockedCoordinates(sztc, itemIndex + 1);
          }
        }

      } else if (rowIndex + shipLength - 1 === 9) {
        if (itemIndex0) {
          store.player.board[rowIndex - 1][itemIndex] = 1;
          blocked(rowIndex - 1, itemIndex);
          addBlockedCoordinates(rowIndex - 1, itemIndex);

          for (var xx = rowIndex - 1; xx <= rowIndex - 1 + shipLength; xx++) {
            blocked(xx, itemIndex + 1);
            store.player.board[xx][itemIndex + 1] = 1;
            addBlockedCoordinates(xx, itemIndex + 1);
          }
        }

        if (itemIndex9) {
          store.player.board[rowIndex - 1][itemIndex] = 1;
          blocked(rowIndex - 1, itemIndex);
          addBlockedCoordinates(rowIndex - 1, itemIndex);

          for (var xxv = rowIndex - 1; xxv <= rowIndex - 1 + shipLength; xxv++) {
            blocked(xxv, itemIndex - 1);
            store.player.board[xxv][itemIndex - 1] = 1;
            addBlockedCoordinates(xxv, itemIndex - 1);
          }
        }

        if (!itemIndex0 && !itemIndex9) {
          store.player.board[rowIndex - 1][itemIndex] = 1;
          blocked(rowIndex - 1, itemIndex);
          addBlockedCoordinates(rowIndex - 1, itemIndex);

          for (var xxl = rowIndex - 1; xxl <= rowIndex - 1 + shipLength; xxl++) {
            blocked(xxl, itemIndex + 1);
            store.player.board[xxl][itemIndex + 1] = 1;
            addBlockedCoordinates(xxl, itemIndex + 1);
          }

          for (var xxm = rowIndex - 1; xxm <= rowIndex - 1 + shipLength; xxm++) {
            blocked(xxm, itemIndex - 1);
            store.player.board[xxm][itemIndex - 1] = 1;
            addBlockedCoordinates(xxm, itemIndex - 1);
          }
        }

      } else if (rowIndex !== 0 && rowIndex + shipLength - 1 !== 9) {
        if (itemIndex0) {
          //По левому краю
          store.player.board[rowIndex + shipLength][itemIndex] = 1;
          blocked(rowIndex + shipLength, itemIndex);
          addBlockedCoordinates(rowIndex + shipLength, itemIndex);

          store.player.board[rowIndex - 1][itemIndex] = 1;
          blocked(rowIndex - 1, itemIndex);
          addBlockedCoordinates(rowIndex - 1, itemIndex);

          for (var zzc = rowIndex - 1; zzc <= rowIndex + shipLength; zzc++) {
            blocked(zzc, itemIndex + 1);
            store.player.board[zzc][itemIndex + 1] = 1;
            addBlockedCoordinates(zzc, itemIndex + 1);
          }
        }

        if (itemIndex9) {
          //По правому краю
          store.player.board[rowIndex + shipLength][itemIndex] = 1;
          blocked(rowIndex + shipLength, itemIndex);
          addBlockedCoordinates(rowIndex + shipLength, itemIndex);

          store.player.board[rowIndex - 1][itemIndex] = 1;
          blocked(rowIndex - 1, itemIndex);
          addBlockedCoordinates(rowIndex - 1, itemIndex);

          for (var zzcx = rowIndex - 1; zzcx <= rowIndex + shipLength; zzcx++) {
            blocked(zzcx, itemIndex - 1);
            store.player.board[zzcx][itemIndex - 1] = 1;
            addBlockedCoordinates(zzcx, itemIndex - 1);
          }
        }

        if (!itemIndex0 && !itemIndex9) {
          store.player.board[rowIndex + shipLength][itemIndex] = 1;
          blocked(rowIndex + shipLength, itemIndex);
          addBlockedCoordinates(rowIndex + shipLength, itemIndex);

          store.player.board[rowIndex - 1][itemIndex] = 1;
          blocked(rowIndex - 1, itemIndex);
          addBlockedCoordinates(rowIndex - 1, itemIndex);

          for (var tttt = rowIndex - 1; tttt <= rowIndex + shipLength; tttt++) {
            blocked(tttt, itemIndex + 1);
            store.player.board[tttt][itemIndex + 1] = 1;
            addBlockedCoordinates(tttt, itemIndex + 1);
          }

          for (var cccc = rowIndex - 1; cccc <= rowIndex + shipLength; cccc++) {
            blocked(cccc, itemIndex - 1);
            store.player.board[cccc][itemIndex - 1] = 1;
            addBlockedCoordinates(cccc, itemIndex - 1);
          }
        }
      }
    }
  }
};

export default blockedAroundVerticalShip;