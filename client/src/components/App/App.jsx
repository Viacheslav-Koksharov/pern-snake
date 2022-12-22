import React, { useState, useEffect } from 'react';
import Container from '../Container';
// import Form from '../Form';
import PlayersList from '../PlayersList';
import Snake from '../Snake';
import Food from '../Food';
import {Box,Content,Input,Wrapper,Button } from './App.styled';

const getRandomCoordinates = () => {
	let min = 1;
	let max = 28;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
};
const getRandomFeedType = ()=>{
	return Math.floor((Math.random() * 3));
}
const App = () => {
	const [playerName, setPlayerName] = useState('');
  	const [snakeDots, setSnakeDots] = useState([[0, 0], [2,0]]);
	const [foodDot, setFoodDot] = useState(getRandomCoordinates());
	const [direction, setDirection] = useState('RIGHT');
    const [pause, SetPause] = useState(false);
	const [alive, setAlive] = useState(false);
	const [speed, setSpeed] = useState(300);
	const [name, setName] = useState('Play');
	const [points, setPoints] = useState(0);
	const [feedType, setFeedType] = useState(getRandomFeedType());
	
	// useEffect(() => {
	// 	// document.onkeydown = onKeyDown;
	// 	// checkIfOutOfBorders();
	// 	// checkIfEat();
	// 	// checkIfCollapsed();
	// 	// const run = setInterval(() => {
	// 	// 	moveSnake(alive);
	// 	// }, speed);
	// 	// return () => clearInterval(run);
	// });

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown);
		return () => {
		document.removeEventListener('keydown', onKeyDown);
		};
	  });

	useEffect(() =>{
		if (pause) {
			return;
		  }
		const moveSnake = () => {
			let dots = [...snakeDots];
			let head = dots[dots.length - 1];
			switch (direction) {
				case 'RIGHT':
					head = [head[0] + 2, head[1]];
					break;
				case 'LEFT':
					head = [head[0] - 2, head[1]];
					break;
				case 'DOWN':
					head = [head[0], head[1] + 2];
					break;
				case 'UP':
					head = [head[0], head[1] - 2];
					break;
          		case 'PAUSE':
			setSnakeDots([...snakeDots]);
					break;
				default:
					break;
			}

			dots.push(head);
			dots.shift();
			setSnakeDots(dots);
	}
		const run = setInterval(() => {
		moveSnake(alive);
	}, speed);
	return () => clearInterval(run);
	},[alive, direction, pause, snakeDots, speed])

	useEffect(()=>{

		function checkIfOutOfBorders() {
			let dots = [...snakeDots];
				let head = snakeDots[snakeDots.length - 1];
			//Out Of Space left
			if( head[1] < 0 ){
			  head[1] = 28;
			  setSnakeDots(dots);
		   }
			//Out Of Space right
			if( head[1] > 28){
			  head[1] = 0;
			  setSnakeDots(dots);
			}
			//Out Of Space up
			if( head[0] < 0 ){
			  head[0] = 28;
			  setSnakeDots(dots);
			}
			//Out Of Space down
			if( head[0] > 28 ){
			  head[0] = 0;
			  setSnakeDots(dots);
			}
		}
		const checkIfCollapsed=()=> {
			let segments = [...snakeDots];
			let head = snakeDots[snakeDots.length - 1];
			segments.pop();
			segments.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
				onGameOver()
			}
		});
		}

		function checkIfEat() {
			let head = snakeDots[snakeDots.length - 1];
			let food = foodDot;

			if (head[0] === food[0] && head[1] === food[1]) {
				setFoodDot(getRandomCoordinates());
				enlargeSnake();
				increaseSpeed();
				if (feedType === 0) {
					setPoints(points + 1);
				  }
				  if (feedType === 1) {
					setPoints(points + 5);
				  }
				  if (feedType === 2) {
					setPoints(points + 10);
				  }
				  setFeedType(getRandomFeedType());
			}
		}

		function enlargeSnake() {
			let newSnake = [...snakeDots];
      		newSnake.unshift([]);
      		setSnakeDots(newSnake);
		}
		

		function increaseSpeed() {
			if (points % 50 === 0) {
				setSpeed(speed *0.9);
			  }
		}
		checkIfEat();
		checkIfOutOfBorders();
		checkIfCollapsed();
	},[feedType, foodDot, points, snakeDots, speed])
	
	function onGameOver() {
		setAlive(false);
		setSnakeDots([[0, 0], [2,0]]);
		setFoodDot([10, 10]);
		setDirection('RIGHT');
		setSpeed(300);
		setPlayerName('');
		setPoints(0)
	}
    function onKeyDown(e) {
		switch (e.keyCode) {
			case 38: direction !== 'DOWN' && setDirection('UP');
				break;
			case 40: direction !== 'UP' && setDirection('DOWN');
				break;
			case 37: direction !== 'RIGHT' && setDirection('LEFT' );
				break;
			case 39: direction !== 'LEFT' && setDirection('RIGHT');
				break;
        	case 32: SetPause(pause => !pause);
       			break;
			default:
				break;
		}
	}

	// function moveSnake() {
	// 		let dots = [...snakeDots];
	// 		let head = dots[dots.length - 1];
	// 		if (pause) {
	// 			return;
	// 		  }
	// 		switch (direction) {
	// 			case 'RIGHT':
	// 				head = [head[0], head[1] + 2];
	// 				break;
	// 			case 'LEFT':
	// 				head = [head[0], head[1] - 2];
	// 				break;
	// 			case 'DOWN':
	// 				head = [head[0] + 2, head[1]];
	// 				break;
	// 			case 'UP':
	// 				head = [head[0] - 2, head[1]];
	// 				break;
    //       		case 'PAUSE':
	// 		setSnakeDots([dots[dots.length - 1],...snakeDots]);
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 		dots.push(head);
	// 		dots.shift();
	// 		setSnakeDots(dots);
	// }

	// function checkIfEat() {
	// 	let head = snakeDots[snakeDots.length - 1];
	// 	let food = foodDot;

	// 	if (head[0] === food[0] && head[1] === food[1]) {
	// 		setFoodDot(getRandomCoordinates());
	// 		enlargeSnake();
	// 		increaseSpeed();
	// 		if (feedType === 0) {
	// 			setPoints(points + 1);
	// 		  }
	// 		  if (feedType === 1) {
	// 			setPoints(points + 5);
	// 		  }
	// 		  if (feedType === 2) {
	// 			setPoints(points + 10);
	// 		  }
	// 		  setFeedType(getRandomFeedType());
	// 	}
	// }

	// function onGameOver() {
    // alert(
    //   `Game Over. Snake length is ${snakeDots.length}, Counter = ${point}.`
    // );
	// 	setAlive(false);
	// 	setSnakeDots([[0, 0], [0, 2]]);
	// 	setFoodDot([10, 10]);
	// 	setDirection('RIGHT');
	// }

// 	function checkIfOutOfBorders() {
//     let dots = [...snakeDots];
// 		let head = snakeDots[snakeDots.length - 1];
//     //Out Of Space left
//     if( head[1] < 0 ){
//       head[1] = 28;
//       setSnakeDots(dots);
//    }
//     //Out Of Space right
//     if( head[1] > 28){
//       head[1] = 0;
//       setSnakeDots(dots);
//     }
//     //Out Of Space up
//     if( head[0] < 0 ){
//       head[0] = 28;
//       setSnakeDots(dots);
//     }
//     //Out Of Space down
//     if( head[0] > 28 ){
//       head[0] = 0;
//       setSnakeDots(dots);
//     }
// 	}

	// const checkIfCollapsed=()=> {
	// 	let snake = [...snakeDots];
	// 	const head = snake[snake.length - 1];
	// 	snake.pop();
	// 	snake.forEach((dot,_) => {
	// 			if (head[0] === dot[0] && head[1] === dot[1]) {
	// 				// onGameOver();
	// 				alert('cross')
	// 			}
	// 	});
	// }

	// function enlargeSnake() {
	// 	let newSnake = [snakeDots[snakeDots.length - 1], ...snakeDots];
	// 	setSnakeDots(newSnake);
	// }

	// function increaseSpeed() {
	// 	if (points % 50 === 0) {
	// 		setSpeed(speed *0.9);
	// 	  }
	// }

	// function onGameOver() {
    // alert(
    //   `Game Over. Snake length is ${snakeDots.length}, Score = ${points}.`
    // );
	// 	setAlive(false);
	// 	setSnakeDots([[0, 0], [2,0]]);
	// 	setFoodDot([10, 10]);
	// 	setDirection('RIGHT');
	// 	setSpeed(300);
	// }

	function rePlay() {
		setDirection('RIGHT');
		setName('Play again');
		setPoints(0);
		setAlive(true);
	}
	const handleChange = e => {
		const { name, value } = e.currentTarget;
		switch (name) {
		  case 'playerName':
			setPlayerName(value);
			break;

		  default:
			return;
		}
	  };
	  const submitForm = e => {
		e.preventDefault();
		setPlayerName('');

	  };


  return (
    <>
      <Container>
        {alive ? (
				<div>
					<Wrapper>
						<Snake snakeDots={snakeDots} />
						<Food foodDot={foodDot} feedType={feedType}/>
					</Wrapper>
				</div>
			) : (
				<div>
					<Box onSubmit={submitForm}>
						<Input
        					type="text"
        					name="playerName"
        					value={playerName}
       						onChange={handleChange}
        					placeholder="Name"
							pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
							required
      					/>
						<Button onClick={rePlay} type="submit">{name}</Button>
					</Box>
				</div>
			)}
        <PlayersList points={points} playerName={playerName} onGameOver = {()=>onGameOver()}/>
      </Container>
    </>
  );
};
export default App;
