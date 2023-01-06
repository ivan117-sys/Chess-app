import React, { useRef, useState } from 'react';
import './Chessboard.css';
import Tile from './Tile.js';
import Tutorial from './Tutorial';
import {
  vertical,
  horizontal,
  gridSize,
  samePosition,
  pawnBlack,
  kingWhite,
  rookWhite2,
  rookWhite,
  kingBlack,
  rookBlack2,
  rookBlack,
  knightBlack2,
} from './Constants';
import { figures } from './Constants';
import { Referee } from './Referee';

let positionX, positionY;
let figure;
figure = figures;
let type;

function ChessBoard() {
  const referee = new Referee();
  const [promotionPawn, setPromotionPawn] = useState();
  const modalRef = useRef();
  const [pieces, setPieces] = useState(figure);
  const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
  const [p, setP] = useState(figure);
  const [activePieces, setActivePieces] = useState();
  // const [gridX, setGridX] = useState(0);
  // const [gridY, setGridY] = useState(0);

  const chessBoardRef = useRef();

  function grab(e) {
    const element = e.target;

    const chessBoard = chessBoardRef.current;

    if (element.classList.contains('pieces') && chessBoard) {
      const grabX = Math.floor((e.clientX - chessBoard.offsetLeft) / gridSize);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - 800) / gridSize)
      );
      setGrabPosition({ x: grabX, y: grabY });
      // setGridX(Math.floor((e.clientX - chessBoard.offsetLeft) / 100));
      // setGridY(
      //   Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100))
      // );

      const x = e.clientX - gridSize / 2;
      const y = e.clientY - gridSize / 2;
      element.style.position = 'absolute';

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePieces(element);
    }
  }

  function move(e) {
    const chessBoard = chessBoardRef.current;
    if (activePieces && chessBoard) {
      const minX = parseInt(chessBoard.offsetLeft - 25);
      const minY = parseInt(chessBoard.offsetTop - 25);
      const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
      const maxY = chessBoard.offsetTop + chessBoard.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePieces.style.position = 'absolute';

      activePieces.style.left = `${x}px`;
      activePieces.style.top = `${y}px`;
      if (x < minX) {
        activePieces.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePieces.style.left = `${maxX}px`;
      } else {
        activePieces.style.left = `${x}px`;
      }
      if (y < minY) {
        activePieces.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePieces.style.top = `${maxY}px`;
      } else {
        activePieces.style.top = `${y}px`;
      }
    }
  }

  function drop(e) {
    const chessBoard = chessBoardRef.current;

    if (activePieces && chessBoard) {
      const x = Math.floor((e.clientX - chessBoard.offsetLeft) / gridSize);
      const y = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100)
      );

      positionY = y;
      positionX = x;

      const currentPiece = pieces.find(p =>
        samePosition(p.position, grabPosition)
      );

      type = currentPiece.type;

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },

          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const castlingWhiteSmall = referee.castlingWhiteSmall(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const castlingBlackSmall = referee.castlingBlackSmall(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const castlingWhiteBig = referee.castlingWhiteBig(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        const castlingBlackBig = referee.castlingBlackBig(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );

        if (castlingWhiteSmall) {
          kingWhite.position.x = 6;
          rookWhite2.position.x = 5;
        }

        if (castlingWhiteBig) {
          kingWhite.position.x = 2;
          rookWhite.position.x = 3;
        }

        if (castlingBlackSmall) {
          kingBlack.position.x = 6;
          rookBlack2.position.x = 5;
        }

        if (castlingBlackBig) {
          kingBlack.position.x = 2;
          rookBlack.position.x = 3;
        }

        const pawnDirection = currentPiece.color === 'white' ? 1 : -1;

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;

              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === 'pawn') {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, []);

          figure = updatedPieces;
          console.log('en passant');
          console.log(updatedPieces);

          setPieces(updatedPieces);
          console.log(setP);
        } else if (validMove) {
          // Update piece position

          const updatedPiesces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              if (Math.abs(grabPosition.y - y) === 2 && piece.type === 'pawn') {
                // Special move

                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.position.x = x;
              piece.position.y = y;

              let promotionRow = piece.color === 'white' ? 7 : 0;

              if (y === promotionRow && piece.type === 'pawn') {
                modalRef.current?.classList.remove('hidden');
                setPromotionPawn(piece);
              }
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === 'pawn') {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, []);

          figure = updatedPiesces;

          setPieces(updatedPiesces);
        } else {
          activePieces.style.position = 'relative';
          activePieces.style.removeProperty('top');
          activePieces.style.removeProperty('left');
        }
      }

      setActivePieces();
    }
  }

  function promotePawn(type) {
    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = type;

        const teamType = piece.color === 'white' ? 'white' : 'black';

        let image;

        switch (type) {
          case 'rook': {
            image = 'rook';
            break;
          }
          case 'bishop': {
            image = 'bishop';
            break;
          }
          case 'knight': {
            image = 'knight';
            break;
          }
          case 'queen': {
            image = 'queen';
            break;
          }
        }

        piece.image = `pieces/${image}_${teamType}.png`;
      }
      results.push(piece);

      return results;
    }, []);

    figure = updatedPieces;

    setPieces(updatedPieces);
    modalRef.current?.classList.add('hidden');
  }

  let board = [];

  function promotionTeamType() {
    return promotionPawn?.color === 'white' ? 'white' : 'black';
  }

  for (let j = vertical.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontal.length; i++) {
      const number = i + j + 2;

      let image;
      figure.forEach(p => {
        if (samePosition(p.position, { x: i, y: j })) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn('bishop')}
            src={`/pieces/bishop_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn('knight')}
            src={`/pieces/knight_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn('queen')}
            src={`/pieces/queen_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn('rook')}
            src={`/pieces/rook_${promotionTeamType()}.png`}
          />
        </div>
      </div>

      <section className="chess__section">
        <Tutorial x={positionX} y={positionY} type={type} />
        <div
          onMouseUp={drop}
          onMouseMove={move}
          onMouseDown={grab}
          id="chessBoard"
          ref={chessBoardRef}
        >
          {board}
        </div>
      </section>
    </>
  );
}

export default ChessBoard;
