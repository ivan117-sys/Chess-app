export const vertical = [1, 2, 3, 4, 5, 6, 7, 8];
export const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const gridSize = 100;

export function samePosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

export let figures = [];

export let pawnBlack;
for (let i = 0; i < 8; i++) {
  pawnBlack = {
    position: {
      x: i,
      y: 6,
    },
    image: 'pieces/pawn_black.png',
    type: 'pawn',
    color: 'black',
    enPassant: true,
  };
  figures.push(pawnBlack);
}

let pawnWhite;
for (let i = 0; i < 8; i++) {
  pawnWhite = {
    position: {
      x: i,
      y: 1,
    },
    image: 'pieces/pawn_white.png',
    type: 'pawn',
    color: 'white',
    enPassant: true,
  };
  figures.push(pawnWhite);
}

export const rookWhite = {
  position: {
    x: 0,
    y: 0,
  },

  image: 'pieces/rook_white.png',
  type: 'rook',
  color: 'white',
  enPassant: true,
};
figures.push(rookWhite);

export const rookWhite2 = {
  position: {
    x: 7,
    y: 0,
  },
  image: 'pieces/rook_white.png',
  type: 'rook',
  color: 'white',
  enPassant: true,
};
figures.push(rookWhite2);

const knightWhite = {
  position: {
    x: 6,
    y: 0,
  },
  image: 'pieces/knight_white.png',
  type: 'knight',
  color: 'white',
  enPassant: true,
};
figures.push(knightWhite);

const knightWhite2 = {
  position: {
    x: 1,
    y: 0,
  },
  image: 'pieces/knight_white.png',
  type: 'knight',
  color: 'white',
  enPassant: true,
};
figures.push(knightWhite2);

const bishopWhite = {
  position: {
    x: 5,
    y: 0,
  },
  image: 'pieces/bishop_white.png',
  type: 'bishop',
  color: 'white',
  enPassant: true,
};
figures.push(bishopWhite);

const bishopWhite2 = {
  position: {
    x: 2,
    y: 0,
  },
  image: 'pieces/bishop_white.png',
  type: 'bishop',
  color: 'white',
  enPassant: true,
};
figures.push(bishopWhite2);

const queenWhite = {
  position: {
    x: 3,
    y: 0,
  },
  image: 'pieces/queen_white.png',
  type: 'queen',
  color: 'white',
  enPassant: true,
};
figures.push(queenWhite);

export const kingWhite = {
  position: {
    x: 4,
    y: 0,
  },
  image: 'pieces/king_white.png',
  type: 'king',
  color: 'white',
  enPassant: true,
  kingCastling: true,
};
figures.push(kingWhite);

export const rookBlack = {
  position: {
    x: 0,
    y: 7,
  },
  image: 'pieces/rook_black.png',
  type: 'rook',
  color: 'black',
  enPassant: true,
};
figures.push(rookBlack);

export const rookBlack2 = {
  position: {
    x: 7,
    y: 7,
  },
  image: 'pieces/rook_black.png',
  type: 'rook',
  color: 'black',
  enPassant: true,
};
figures.push(rookBlack2);

const knightBlack = {
  position: {
    x: 6,
    y: 7,
  },
  image: 'pieces/knight_black.png',
  type: 'knight',
  color: 'black',
  enPassant: true,
};
figures.push(knightBlack);

export const knightBlack2 = {
  position: {
    x: 1,
    y: 7,
  },
  image: 'pieces/knight_black.png',
  type: 'knight',
  color: 'black',
  enPassant: true,
};
figures.push(knightBlack2);

const bishopBlack = {
  position: {
    x: 5,
    y: 7,
  },
  image: 'pieces/bishop_black.png',
  type: 'bishop',
  color: 'black',
  enPassant: true,
};
figures.push(bishopBlack);

const bishopBlack2 = {
  position: {
    x: 2,
    y: 7,
  },
  image: 'pieces/bishop_black.png',
  type: 'bishop',
  color: 'black',
  enPassant: true,
};
figures.push(bishopBlack2);

const queenBlack = {
  position: {
    x: 3,
    y: 7,
  },
  image: 'pieces/queen_black.png',
  color: 'black',
  type: 'queen',
  enPassant: true,
};
figures.push(queenBlack);

export const kingBlack = {
  position: {
    x: 4,
    y: 7,
  },
  image: 'pieces/king_black.png',
  type: 'king',
  color: 'black',
  enPassant: true,
};

figures.push(kingBlack);

// const pawnDirection = currentPiece.color === 'white' ? 1 : -1;

// if (isEnPassantMove) {
//   const newPieces = pieces.reduce((results, piece) => {
//     if (piece.x === gridX && piece.y === gridY) {
//       piece.enPassant = false;
//       piece.x = x;
//       piece.y = y;
//       results.push(piece);
//     } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
//       if (piece.type === 'pawn') {
//         piece.enPassant = false;
//       }

//     }
//     return results;
//   }, []);

//   figures = newPieces;
//   console.log(newPieces);
//   setPieces(newPieces);
// }
