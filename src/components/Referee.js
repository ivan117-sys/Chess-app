import { samePosition } from './Constants';

export class Referee {
  tileisEmptyOrOccupiedByOpponent(position, value, color) {
    return (
      !this.tileisOccupied(position, value) ||
      this.tileIsOccupiedByOpponent(position, value, color)
    );
  }

  tileisOccupied(position, value) {
    const piece = value.find(p => samePosition(p.position, position));
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(position, value, color) {
    const piece = value.find(
      p => samePosition(p.position, position) && p.color !== color
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(initialPosition, desiredPosition, type, color, value) {
    const pawnDirection = color === 'white' ? 1 : -1;

    if (type === 'pawn') {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = value.find(
          p =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );

        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  isValidMove(initialPosition, desiredPosition, type, color, value) {
    if (type === 'pawn') {
      const specialRow = color === 'white' ? 1 : 6;
      const pawnDirection = color === 'white' ? 1 : -1;

      // Movement logic
      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileisOccupied(desiredPosition, value) &&
          !this.tileisOccupied(
            { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },

            value
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (!this.tileisOccupied(desiredPosition, value)) {
          return true;
        }
      }
      // ATTACK LOGIC
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // Attack in upper or bottom left corner

        if (this.tileIsOccupiedByOpponent(desiredPosition, value, color)) {
          return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // Attack in the upper or bottom right corner

        if (this.tileIsOccupiedByOpponent(desiredPosition, value, color)) {
          return true;
        }
      }
    } else if (type === 'knight') {
      // Moving the knight
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          if (desiredPosition.y - initialPosition.y === 2 * i) {
            if (desiredPosition.x - initialPosition.x === j) {
              if (
                this.tileisEmptyOrOccupiedByOpponent(
                  desiredPosition,
                  value,
                  color
                )
              ) {
                return true;
              }
            }
          }
          if (desiredPosition.x - initialPosition.x === 2 * i) {
            if (desiredPosition.y - initialPosition.y === j) {
              if (
                this.tileisEmptyOrOccupiedByOpponent(
                  desiredPosition,
                  value,
                  color
                )
              ) {
                return true;
              }
            }
          }
        }
      }
    } else if (type === 'bishop') {
      // Movement and attack logic for the bishop
      // Up right movement

      for (let i = 1; i < 8; i++) {
        // Up right movement
        if (
          desiredPosition.x > initialPosition.x &&
          desiredPosition.y > initialPosition.y
        ) {
          let passedPosition = {
            x: initialPosition.x + i,
            y: initialPosition.y + i,
          };

          if (
            passedPosition.x === desiredPosition.x &&
            passedPosition.y === desiredPosition.y
          ) {
            if (
              this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
            ) {
              return true;
            }
          } else {
            if (this.tileisOccupied(passedPosition, value)) {
              break;
            }
          }
        }

        //  Bottom right
        if (
          desiredPosition.x > initialPosition.x &&
          desiredPosition.y < initialPosition.y
        ) {
          let passedPosition = {
            x: initialPosition.x + i,
            y: initialPosition.y - i,
          };

          if (
            passedPosition.x === desiredPosition.x &&
            desiredPosition.y < initialPosition.y
          ) {
            // Dealing with destination tile
            if (
              this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
            ) {
              return true;
            }
          } else {
            if (this.tileisOccupied(passedPosition, value)) {
              break;
            }
          }
        }

        // Bottom left movement

        if (
          desiredPosition.x < initialPosition.x &&
          desiredPosition.y < initialPosition.y
        ) {
          let passedPosition = {
            x: initialPosition.x - i,
            y: initialPosition.y - i,
          };

          if (
            passedPosition.x === desiredPosition.x &&
            desiredPosition.y < initialPosition.y
          ) {
            // Dealing with destination tile
            if (
              this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
            ) {
              return true;
            }
          } else {
            if (this.tileisOccupied(passedPosition, value)) {
              break;
            }
          }
        }
        // top left movement
        if (
          desiredPosition.x < initialPosition.x &&
          desiredPosition.y > initialPosition.y
        ) {
          let passedPosition = {
            x: initialPosition.x - i,
            y: initialPosition.y + i,
          };

          if (
            passedPosition.x === desiredPosition.x &&
            passedPosition.y === desiredPosition.y
          ) {
            // Dealing with destination tile
            if (
              this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
            ) {
              return true;
            }
          } else {
            if (this.tileisOccupied(passedPosition, value)) {
              break;
            }
          }
        }
      }
    } else if (type === 'rook') {
      if (initialPosition.x === desiredPosition.x) {
        for (let i = 1; i < 8; i++) {
          let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;

          let passedPosition = {
            x: initialPosition.x,
            y: initialPosition.y + i * multiplier,
          };

          if (
            passedPosition.x === desiredPosition.x &&
            passedPosition.y === desiredPosition.y
          ) {
            if (
              this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
            ) {
              return true;
            }
          } else {
            if (this.tileisOccupied(passedPosition, value)) {
              break;
            }
          }
        }
      }

      if (initialPosition.y === desiredPosition.y) {
        for (let i = 1; i < 8; i++) {
          let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;

          let passedPosition = {
            x: initialPosition.x + i * multiplier,
            y: initialPosition.y,
          };
          if (
            passedPosition.x === desiredPosition.x &&
            passedPosition.y === desiredPosition.y
          ) {
            if (
              this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
            ) {
              return true;
            }
          } else {
            if (this.tileisOccupied(passedPosition, value)) {
              break;
            }
          }
        }
      }
    } else if (type === 'queen') {
      for (let i = 1; i < 8; i++) {
        // Diagonal

        let multiplierX;
        let multiplierY;

        if (desiredPosition.x < initialPosition.x) {
          multiplierX = -1;
        } else if (desiredPosition.x > initialPosition.x) {
          multiplierX = 1;
        } else {
          // X value is unchanged
          multiplierX = 0;
        }

        if (desiredPosition.y < initialPosition.y) {
          multiplierY = -1;
        } else if (desiredPosition.y > initialPosition.y) {
          multiplierY = 1;
        } else {
          // Y value is unchanged
          multiplierY = 0;
        }

        let passedPosition = {
          x: initialPosition.x + i * multiplierX,
          y: initialPosition.y + i * multiplierY,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
          ) {
            return true;
          }
        } else {
          if (this.tileisOccupied(passedPosition, value)) {
            break;
          }
        }
      }
    } else if (type === 'king') {
      for (let i = 1; i < 2; i++) {
        // Diagonal

        let multiplierX;
        let multiplierY;

        if (desiredPosition.x < initialPosition.x) {
          multiplierX = -1;
        } else if (desiredPosition.x > initialPosition.x) {
          multiplierX = 1;
        } else {
          // X value is unchanged
          multiplierX = 0;
        }

        if (desiredPosition.y < initialPosition.y) {
          multiplierY = -1;
        } else if (desiredPosition.y > initialPosition.y) {
          multiplierY = 1;
        } else {
          // Y value is unchanged
          multiplierY = 0;
        }

        let passedPosition = {
          x: initialPosition.x + i * multiplierX,
          y: initialPosition.y + i * multiplierY,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileisEmptyOrOccupiedByOpponent(passedPosition, value, color)
          ) {
            return true;
          }
        } else {
          if (this.tileisOccupied(passedPosition, value)) {
            break;
          }
        }
      }
    }

    return false;
  }

  castlingWhiteSmall(initialPosition, desiredPosition, type, color, value) {
    if (type === 'king' && color === 'white') {
      for (let i = 1; i < 3; i++) {
        if (
          initialPosition.x === 4 &&
          desiredPosition.x === 6 &&
          !this.tileisOccupied(desiredPosition, value)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  castlingWhiteBig(initialPosition, desiredPosition, type, color, value) {
    if (type === 'king' && color === 'white') {
      for (let i = 1; i < 4; i++) {
        if (
          initialPosition.x === 4 &&
          desiredPosition.x === 2 &&
          !this.tileisOccupied(desiredPosition, value)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  castlingBlackSmall(initialPosition, desiredPosition, type, color, value) {
    if (type === 'king' && color === 'black') {
      for (let i = 1; i < 3; i++) {
        if (
          initialPosition.x === 4 &&
          desiredPosition.x === 6 &&
          !this.tileisOccupied(desiredPosition, value)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  castlingBlackBig(initialPosition, desiredPosition, type, color, value) {
    if (type === 'king' && color === 'black') {
      for (let i = 1; i < 4; i++) {
        if (
          initialPosition.x === 4 &&
          desiredPosition.x === 2 &&
          !this.tileisOccupied(desiredPosition, value)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
