const opponentOptions = [
  {
    bombedShips: 0,
    coordinates: [
      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 2, itemIndex: 5 },
          { rowIndex: 1, itemIndex: 5 },
          { rowIndex: 1, itemIndex: 6 },
          { rowIndex: 1, itemIndex: 7 },
          { rowIndex: 1, itemIndex: 8 },
          { rowIndex: 1, itemIndex: 9 },
          { rowIndex: 3, itemIndex: 5 },
          { rowIndex: 3, itemIndex: 6 },
          { rowIndex: 3, itemIndex: 7 },
          { rowIndex: 3, itemIndex: 8 },
          { rowIndex: 3, itemIndex: 9 }
        ],
        coordinates: [
          { rowIndex: 2, itemIndex: 6, bombed: false },
          { rowIndex: 2, itemIndex: 7, bombed: false },
          { rowIndex: 2, itemIndex: 8, bombed: false },
          { rowIndex: 2, itemIndex: 9, bombed: false }
        ],
        killShip: false
      }
    ],
    length: 4,
    type: "battleship"
  },


  {
    bombedShips: 0,
    coordinates: [
      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 6, itemIndex: 9 },
          { rowIndex: 6, itemIndex: 8 },
          { rowIndex: 7, itemIndex: 8 },
          { rowIndex: 8, itemIndex: 8 },
          { rowIndex: 9, itemIndex: 8 }
        ],
        coordinates: [
          { rowIndex: 7, itemIndex: 9, bombed: false },
          { rowIndex: 8, itemIndex: 9, bombed: false },
          { rowIndex: 9, itemIndex: 9, bombed: false }
        ],
        killShip: false
      },

      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 0, itemIndex: 3 },
          { rowIndex: 1, itemIndex: 0 },
          { rowIndex: 1, itemIndex: 1 },
          { rowIndex: 1, itemIndex: 2 },
          { rowIndex: 1, itemIndex: 3 }
        ],
        coordinates: [
          { rowIndex: 0, itemIndex: 0, bombed: false },
          { rowIndex: 0, itemIndex: 1, bombed: false },
          { rowIndex: 0, itemIndex: 2, bombed: false }
        ],
        killShip: false
      },
    ],
    length: 3,
    type: "cruiser"
  },


  {
    bombedShips: 0,
    coordinates: [
      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 0, itemIndex: 7 },
          { rowIndex: 1, itemIndex: 7 },
          { rowIndex: 1, itemIndex: 8 },
          { rowIndex: 1, itemIndex: 9 }
        ],
        coordinates: [
          { rowIndex: 0, itemIndex: 8, bombed: false },
          { rowIndex: 0, itemIndex: 9, bombed: false }
        ],
        killShip: false
      },

      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 7, itemIndex: 4 },
          { rowIndex: 4, itemIndex: 4 },
          { rowIndex: 4, itemIndex: 5 },
          { rowIndex: 5, itemIndex: 5 },
          { rowIndex: 6, itemIndex: 5 },
          { rowIndex: 7, itemIndex: 5 },
          { rowIndex: 4, itemIndex: 3 },
          { rowIndex: 5, itemIndex: 3 },
          { rowIndex: 6, itemIndex: 3 },
          { rowIndex: 7, itemIndex: 3 }
        ],
        coordinates: [
          { rowIndex: 5, itemIndex: 4, bombed: false },
          { rowIndex: 6, itemIndex: 4, bombed: false }
        ],
        killShip: false
      },

      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 9, itemIndex: 3 },
          { rowIndex: 9, itemIndex: 0 },
          { rowIndex: 8, itemIndex: 0 },
          { rowIndex: 8, itemIndex: 1 },
          { rowIndex: 8, itemIndex: 2 },
          { rowIndex: 8, itemIndex: 3 }
        ],
        coordinates: [
          { rowIndex: 9, itemIndex: 1, bombed: false },
          { rowIndex: 9, itemIndex: 2, bombed: false }
        ],
        killShip: false
      }
    ],
    length: 2,
    type: "destroyer"
  },


  {
    bombedShips: 0,
    coordinates: [
      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 3, itemIndex: 3 },
          { rowIndex: 3, itemIndex: 1 },
          { rowIndex: 2, itemIndex: 1 },
          { rowIndex: 2, itemIndex: 2 },
          { rowIndex: 2, itemIndex: 3 },
          { rowIndex: 4, itemIndex: 1 },
          { rowIndex: 4, itemIndex: 2 },
          { rowIndex: 4, itemIndex: 3 }
        ],

        coordinates: [{ rowIndex: 3, itemIndex: 2, bombed: false }],
        killShip: false
      },


      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 9, itemIndex: 7 },
          { rowIndex: 9, itemIndex: 5 },
          { rowIndex: 8, itemIndex: 5 },
          { rowIndex: 8, itemIndex: 6 },
          { rowIndex: 8, itemIndex: 7 }
        ],

        coordinates: [{ rowIndex: 9, itemIndex: 6, bombed: false }],
        killShip: false
      },


      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 0, itemIndex: 6 },
          { rowIndex: 0, itemIndex: 4 }
        ],

        coordinates: [{ rowIndex: 0, itemIndex: 5, bombed: false }],
        killShip: false
      },


      {
        bombedLength: 0,
        blockedCoordinates: [
          { rowIndex: 5, itemIndex: 1 },
          { rowIndex: 4, itemIndex: 0 },
          { rowIndex: 4, itemIndex: 1 },
          { rowIndex: 6, itemIndex: 0 },
          { rowIndex: 6, itemIndex: 1 }
        ],

        coordinates: [{ rowIndex: 5, itemIndex: 0, bombed: false }],
        killShip: false
      }
    ],
    length: 1,
    type: "torpedo"
  }
];

export default opponentOptions;
