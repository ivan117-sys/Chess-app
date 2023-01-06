import './Tutorial.css';
import React, { useState } from 'react';

function Tutorial(props) {
  const [center, setCenter] =
    useState(`Common first move in chess is playing with pawns, fighthing for the
  center`);

  const [knight, setKnight] = useState(
    `Play your other knight to the center too! Also
     It is good to keep your pieces close to the king so they can protect him`
  );

  const [e3, setE3] = useState(
    `Try putting the pawn next to the queen in the center too!`
  );

  const [e4, setE4] = useState(
    `Great job this is one of the most commonly played move in chess it controls center with the pawn, and makes it easy for your pieces to develop`
  );

  const [sidePawn, setSidePawn] = useState(
    `Try playing your center pawns or develop pieces, wait until after you castle to play with side pawns`
  );

  const [kingPawn, setKingPawn] = useState(
    `Be carefull not to move pawns in front of the king too early, especially if you will castle on the right side`
  );

  const [d3, setd3] = useState(`Good job, try developing king pawn next`);

  const [d4, setd4] = useState(
    `Challenge the center by playing king pawn too, It is good to have as many pawns as possible in the center of the board!`
  );

  const [knightc3, setKnightc3] = useState(
    `Great job knight is now controlling key center squares`
  );

  const [whiteBishopMove, setWhiteBishopMove] = useState(
    `Try developing other bishop too`
  );

  const [castling, setCastlingSmall] = useState(
    `Try to find time to castle, it is very important that your king is safe`
  );

  const [queen1, setQueen1] = useState(
    `Be carefull not to move queen too early in the game`
  );

  const [king1, setKing1] = useState(
    `Great job, your king is now safe and you can start developing middlegame plans`
  );

  const [knightSides, setKnightSides] = useState(
    ` 'Knights on a rim are grim :(', Usually knights are not good on the ends of the board, try to position them in center`
  );

  const [rooks1, setRooks1] = useState(
    `Rook is the last piece to move, afther all of your pieces are in action`
  );

  const [pawnOverextend, setPawnOverExtend] = useState(
    `Be carefull not to attack to early, because you will have trouble with defending your king`
  );

  const [knightPassiveRow2, setKnightPassiveRow2] = useState(
    `Knights can be little passive on second row, always look to play them on f3 or c3 square`
  );

  const [queenOutOfTheWay1, setQueenOutOfTheWay] = useState(
    `Excellent work queen is close to the king to help defend him, and it is also out of the way so after castling rooks will be connected :)`
  );

  const [bishopOnDiagonals1, setBishopOnDiagonals1] = useState(
    `Excellent work, bisops thrive on the long diagonals and be sure to position them accordingly`
  );

  const [kingNotGood1, setKingNotGood1] = useState(
    `Be carefull, always try to castle your king otherwise it will be easy to checkmate your KING!`
  );

  const [knightsInCenter1, setKnightsInCenter1] = useState(
    `Tremendous work, knights belong in the center of the board!`
  );

  const [pawnPromotion1, setPawnPromotion1] = useState(
    `Remember if pawn reaches the end of the board it can promote to any piece of your choosing!`
  );

  const [sidePawns1, setSidePawns1] = useState(
    `Sometimes it is good to push queen outside pawn, because your side gains valuable space`
  );

  const [fianchettoBishop1, setFianchettoBishop1] = useState(
    `Great work, fianchettoed bishop is one of the most strongest  pieces and will be torn in the eye of the opponent`
  );

  const [cPawn1, setcPawn1] = useState(
    `Remeber you can use your C pawn to support and defend important D pawn`
  );

  const [fPawn1, setfPawn1] = useState(
    `'f pawn stands for FORGET ABOUT IT!' Dont move your f pawn before castling cause he is the most important defender of your king!`
  );

  let initialMove = false;

  if (
    props.x === undefined &&
    props.y === undefined &&
    props.type === undefined
  ) {
    initialMove = true;
  }

  let center1 = false;

  if (props.type === 'pawn' && props.x === 4 && props.y === 2) {
    center1 = true;
  }

  let whiteKnight = false;

  if (props.type === 'knight' && props.x === 5 && props.y === 2) {
    whiteKnight = true;
  }

  let center2 = false;
  if (props.type === 'pawn' && props.x === 4 && props.y === 3) {
    center2 = true;
  }

  let playInCenter = false;

  for (let i = 0; i < 3; i++) {
    for (let j = 2; j < 4; j++) {
      let multi = i;
      let multi2 = j;

      if (props.type === 'pawn' && props.x === multi && props.y === multi2) {
        playInCenter = true;
      }
    }
  }

  let playOnTheFlank = false;

  for (let i = 5; i < 8; i++) {
    for (let j = 2; j < 4; j++) {
      let multi = i;
      let multi2 = j;

      if (props.type === 'pawn' && props.x === multi && props.y === multi2) {
        playOnTheFlank = true;
      }
    }
  }

  let queenPawnsmall = false;

  if (props.type === 'pawn' && props.x === 3 && props.y === 2) {
    queenPawnsmall = true;
  }

  let queenPawnBig = false;

  if (props.type === 'pawn' && props.x === 3 && props.y === 3) {
    queenPawnBig = true;
  }

  let whiteKnight2 = false;

  if (props.type === 'knight' && props.x === 2 && props.y === 2) {
    whiteKnight2 = true;
  }

  let whiteBishop = false;
  if (
    (props.type === 'bishop' && props.x === 4) ||
    (props.type === 'bishop' && props.x === 3) ||
    (props.type === 'bishop' && props.x === 2) ||
    (props.type === 'bishop' && props.x === 1) ||
    (props.type === 'bishop' && props.y === 3)
  ) {
    whiteBishop = true;
  }

  let castle = false;
  console.log(props);

  if (
    (props.type === 'bishop' && props.y === 1) ||
    (props.type === 'bishop' && props.y === 2) ||
    (props.type === 'bishop' && props.y === 3) ||
    (props.type === 'bishop' && props.y === 4)
  ) {
    castle = true;
    console.log(castle);
  }

  let queen;
  for (let i = 1; i < 7; i++) {
    let multi = i;
    if (props.type === 'queen' && props.x === multi) {
      queen = true;
    }
  }

  let king = false;
  if (props.type === 'king' && props.x === 6) {
    king = true;
  }

  let knightSide;
  if (
    (props.type === 'knight' && props.x === 0) ||
    (props.type === 'knight' && props.x === 7)
  ) {
    knightSide = true;
  }

  let rooks = false;

  if (
    (props.type === 'rook' && props.x === 1) ||
    (props.type === 'rook' && props.x === 2) ||
    (props.type === 'rook' && props.x === 3) ||
    (props.type === 'rook' && props.x === 4) ||
    (props.type === 'rook' && props.x === 5)
  ) {
    rooks = true;
  }

  let overextend = false;

  if (props.type === 'pawn' && props.y === 4) {
    overextend = true;
  }

  let knightPassive = false;

  if (props.type === 'knight' && props.y === 1) {
    knightPassive = true;
  }

  let queenOutOfTheWay = false;

  if (
    (props.type === 'queen' && props.y === 1) ||
    (props.type === 'queen' && props.y === 2)
  ) {
    queenOutOfTheWay = true;
  }

  let bishopOnDiagonals = false;

  if (
    (props.type === 'bishop' && props.y === 2) ||
    (props.type === 'bishop' && props.y === 3)
  ) {
    bishopOnDiagonals = true;
  }

  let kingNotGood = false;

  if (props.type === 'king' && props.y === 1) {
    kingNotGood = true;
  }

  let knightsInCenter = false;

  if (
    (props.type === 'knight' && props.y === 3 && props.x === 3) ||
    (props.type === 'knight' && props.y === 4 && props.x === 4)
  ) {
    knightsInCenter = true;
  }

  let pawnPromotion = false;

  if (props.type === 'pawn' && props.y === 5) {
    pawnPromotion = true;
  }

  let sidePawns = false;

  if (
    (props.type === 'pawn' && props.x === 0 && props.y === 3) ||
    (props.type === 'pawn' && props.x === 0 && props.y === 4)
  ) {
    sidePawns = true;
  }

  let fianchettoBishop = false;

  if (
    (props.type === 'bishop' && props.x === 1 && props.y === 1) ||
    (props.type === 'bishop' && props.x === 6 && props.y === 1)
  ) {
    fianchettoBishop = true;
  }

  let cPawn = false;

  if (
    (props.type === 'pawn' && props.x === 2 && props.y === 2) ||
    (props.type === 'pawn' && props.x === 2 && props.y === 3)
  ) {
    cPawn = true;
  }

  let fPawn = false;

  if (
    (props.type === 'pawn' && props.x === 5 && props.y === 2) ||
    (props.type === 'pawn' && props.x === 5 && props.y === 3)
  ) {
    fPawn = true;
  }

  return (
    <>
      <div className="tutorial">
        {initialMove && <p className="hint">{center}</p>}
        {center1 && <p className="hint">{e3}</p>}
        {whiteKnight && <p className="hint">{knight}</p>}
        {center2 && <p className="hint">{e4}</p>}
        {playInCenter && <p className="hint">{sidePawn}</p>}
        {playOnTheFlank && <p className="hint">{kingPawn}</p>}
        {queenPawnsmall && <p className="hint">{d3}</p>}
        {queenPawnBig && <p className="hint">{d4}</p>}
        {whiteKnight2 && <p className="hint">{knightc3}</p>}
        {whiteBishop && <p className="hint">{whiteBishopMove}</p>}
        {castle && <p className="hint">{castling}</p>}
        {queen && <p className="hint">{queen1}</p>}
        {king && <p className="hint">{king1}</p>}
        {knightSide && <p className="hint">{knightSides}</p>}
        {rooks && <p className="hint">{rooks1}</p>}
        {overextend && <p className="hint">{pawnOverextend}</p>}
        {knightPassive && <p className="hint">{knightPassiveRow2}</p>}
        {queenOutOfTheWay && <p className="hint">{queenOutOfTheWay1}</p>}
        {bishopOnDiagonals && <p className="hint">{bishopOnDiagonals1}</p>}
        {kingNotGood && <p className="hint">{kingNotGood1}</p>}
        {knightsInCenter && <p className="hint">{knightsInCenter1}</p>}
        {pawnPromotion && <p className="hint">{pawnPromotion1}</p>}
        {sidePawns && <p className="hint">{sidePawns1}</p>}
        {fianchettoBishop && <p className="hint">{fianchettoBishop1}</p>}
        {cPawn && <p className="hint">{cPawn1}</p>}
        {fPawn && <p className="hint">{fPawn1}</p>}
      </div>
    </>
  );
}

export default Tutorial;
