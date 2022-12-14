import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GiStrawberry } from 'react-icons/gi'; // 1 point
import { FaHamburger } from 'react-icons/fa'; // 5 points
import { TbMeat } from 'react-icons/tb'; // 10 points
import { Board, Cell } from './GameBoard.styled';

const GameBoard = () => {
  const [grid, setGrid] = useState([]);
  const [cellNumber, setCellNumber] = useState();
  const [foodPoint, setFoodPoint] = useState(null);

  // Create gamefied
  useEffect(() => {
    const gridArray = [];
    let id = 1;
    for (let row = 0; row < 25; row += 1) {
      for (let col = 0; col < 25; col += 1) {
        gridArray.push({ row, col, id });
        id += 1;
      }
    }
    setGrid(gridArray);
    setCellNumber(Math.ceil(Math.random() * (625 - 1) + 1));
  }, []);

  // Create food
  useEffect(() => {
    if (cellNumber) {
      const foodPoint = document.getElementById(String(cellNumber));
      setFoodPoint(foodPoint);
    }
  }, [cellNumber]);

  //Create snake

  return (
    <Board>
      {grid?.map(({ row, col, id }) => (
        <Cell key={`${row}-${col}`} id={id}>
          {cellNumber && id === cellNumber && (
            <IconContext.Provider value={{ className: 'react-icons' }}>
              <GiStrawberry />
            </IconContext.Provider>
          )}
        </Cell>
      ))}
    </Board>
  );
};

export default GameBoard;
