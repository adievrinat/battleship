class SinglePlayerAddForm {
  constructor() {
    this.battleshipContainer = document.getElementById("battleship");
    document.querySelector("[data-bsp-menu]").remove();

    const template = `<div class="battleship__board" data-bsp-single-player-board>
                        <div class="battleship__grid grid">
                            <ul class="grid__horizontal-coordinates">
                                  <li class="grid__coordinates-item">A</li>
                                  <li class="grid__coordinates-item">B</li>
                                  <li class="grid__coordinates-item">C</li>
                                  <li class="grid__coordinates-item">D</li>
                                  <li class="grid__coordinates-item">E</li>
                                  <li class="grid__coordinates-item">F</li>
                                  <li class="grid__coordinates-item">G</li>
                                  <li class="grid__coordinates-item">H</li>
                                  <li class="grid__coordinates-item">I</li>
                                  <li class="grid__coordinates-item">J</li>   
                            </ul>
                            <ul class="grid__vertical-coordinates">
                                <li class="grid__coordinates-item">1</li>
                                <li class="grid__coordinates-item">2</li>
                                <li class="grid__coordinates-item">3</li>
                                <li class="grid__coordinates-item">4</li>
                                <li class="grid__coordinates-item">5</li>
                                <li class="grid__coordinates-item">6</li>
                                <li class="grid__coordinates-item">7</li>
                                <li class="grid__coordinates-item">8</li>
                                <li class="grid__coordinates-item">9</li>
                                <li class="grid__coordinates-item">10</li>   
                            </ul>
                            <div class="grid__container" data-bsp-single-player-grid-container>
                              
                            </div>
                        </div>
                    </div>`;

    this.battleshipContainer.innerHTML = template;
    this.board = this.battleshipContainer.querySelector("[data-bsp-single-player-board]");
    this.gridContainer = this.board.querySelector("[data-bsp-single-player-grid-container]");

    this.addGrid();
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
      // item.addEventListener("click", this.addShips.bind(this));
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
}

export default SinglePlayerAddForm;