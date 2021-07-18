import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let i = 0; i < nrows; i++) {
      let row = [];
      for(let j = 0; j < ncols; j++) {
        row.push(Math.random() > chanceLightStartsOn ? true : false);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(col => !col));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      const cells = [
        {"y": y, "x": x},         // flip the cell the user selected
        {"y": y-1, "x": x},       // flip the cell above the cell the user selected
        {"y": y + 1, "x": x},     // flip the cell below the cell the user selected
        {"y": y, "x": x - 1},     // flip the cell to the left of the cell the user selected
        {"y": y, "x": x + 1}];    // flip the cell to the right of the cell the user selected
      cells.map(cell => flipCell(cell.y, cell.x, boardCopy));

      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return (<h1>You Won</h1>)
  } else {
  // make table board

  // TODO
  
    return (
      <table className="Board">
        <tbody>
          {board.map((row,ridx) => 
            <tr className="Board-row" key={ridx}>
              {row.map((col, cidx) => 
                <Cell flipCellsAroundMe={() => flipCellsAround(`${ridx}-${cidx}`)} isLit={col} key={3 * ridx + cidx} />)}
            </tr>
          )}
        </tbody>
        
      </table>
    )
  }
}

Board.defaultProps = {
  nrows: 3,
  ncols: 3,
  chanceLightStartsOn: 0.5
};

export default Board;
