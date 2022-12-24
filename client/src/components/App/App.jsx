import React, { useState, useEffect, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { directionContext } from '../../context/DirectionContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { getRandomCoordinates, getRandomFeedType, addPlayer } from '../../helpers/helpers';
import { buttons } from '../../constants/buttons';
import { icons } from '../../constants/icons';
import { fullpoints } from '../../constants/fullpoints';
import * as api from '../../service/api';
import Container from '../Container';
import FormPlayer from '../FormPlayer';
import PlayersList from '../PlayersList';
import Snake from '../Snake';
import Food from '../Food';
import { Wrapper } from './App.styled';

const App = () => {
	const { KEYS, DIRECTIONS } = buttons;
	const { UP, DOWN, RIGHT, LEFT, PAUSE } = DIRECTIONS;
	const { START, END } = fullpoints;
	const { postPlayer } = api;
	const { name, setName, count, setCount } = useContext(playerContext);
	const { direction, setDirection } = useContext(directionContext);
	const { alive, setAlive } = useContext(aliveContext);
  	const [snakeDots, setSnakeDots] = useState([[0, 0], [2, 0]]);
	const [foodDot, setFoodDot] = useState(getRandomCoordinates);
    const [pause, setPause] = useState(false);
	const [speed, setSpeed] = useState(300);
	const [feedType, setFeedType] = useState(getRandomFeedType());
	const [isOver, setIsOver] = useState(false);

	useEffect(() => {
		const onKeyDown = (e) => {
			switch (e.keyCode) {
				case KEYS.UP:
					direction !== DOWN && setDirection(UP);
					break;
				case KEYS.DOWN:
					direction !== UP && setDirection(DOWN);
					break;
				case KEYS.LEFT:
					direction !== RIGHT && setDirection(LEFT);
					break;
				case KEYS.RIGHT:
					direction !== LEFT && setDirection(RIGHT);
					break;
				case KEYS.PAUSE: setPause(pause => !pause);
					   break;
				default:
					break;
			}
		}

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [DOWN, KEYS.DOWN, KEYS.LEFT, KEYS.PAUSE, KEYS.RIGHT, KEYS.UP, LEFT, RIGHT, UP, direction, setDirection]);

	useEffect(() => {
		if (pause) {
			return;
		}

		const moveSnake = () => {
			const dots = [...snakeDots];
			let head = dots[dots.length - 1];
			const [dotX, dotY] = head;

			switch (direction) {
				case RIGHT:
					head = [dotX + 2, dotY];
					break;
				case LEFT:
					head = [dotX - 2, dotY];
					break;
				case DOWN:
					head = [dotX, dotY + 2];
					break;
				case UP:
					head = [dotX, dotY - 2];
					break;
          		case PAUSE:
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
	},[DOWN, LEFT, PAUSE, RIGHT, UP, alive, direction, pause, snakeDots, speed])

	useEffect(() => {
		const checkIfOutOfBorders = () => {
			const dots = [...snakeDots];
			let head = snakeDots[snakeDots.length - 1];
			//Out Of Space left
			if (head[1] < START ){
			  head[1] = END;
			  setSnakeDots(dots);
		   	}
			//Out Of Space right
			if (head[1] > END){
			  head[1] = START;
			  setSnakeDots(dots);
			}
			//Out Of Space up
			if (head[0] < START ){
			  head[0] = END;
			  setSnakeDots(dots);
			}
			//Out Of Space down
			if (head[0] > END ){
			  head[0] = START;
			  setSnakeDots(dots);
			}
		}

		const onGameOver = () => {
			setFoodDot([10, 10]);
			setDirection(RIGHT);
			setSpeed(300);
			setSnakeDots([[0, 0], [2, 0]]);
			setIsOver(true);
		}

		const checkIfCollapsed = () => {
			const segments = [...snakeDots];
			const head = snakeDots[snakeDots.length - 1];
			segments.pop();
			segments.forEach(dot => {
				if (head[0] === dot[0] && head[1] === dot[1]) {
					onGameOver()
				}
			});
		}

		const increaseSnakeLength = () => {
			const array = [];
			const [dotX, dotY] = snakeDots[0];
			switch (direction) {
				case DOWN:
					array.push(dotX, dotY - 2);
					break;
				case UP:
					array.push(dotX, dotY + 2);
					break;
				case RIGHT:
					array.push(dotX - 2, dotY);
					break;
				case LEFT:
					array.push(dotX + 2, dotY);
					break;
				default:
					break;
			}
			return array;
		}

		const enlargeSnake = () => {
			let newSnake = [...snakeDots];
      		newSnake.unshift(increaseSnakeLength());
      		setSnakeDots(newSnake);
		}

		const increaseSpeed = () => {
			if (count % 50 === 0) {
				setSpeed(speed *0.9);
			}
		}

		const checkIfEat = () => {
			const { POINTS } = icons;
			const { STRAWBERRY, HAMBURGER, MEAT } = POINTS;
			const head = snakeDots[snakeDots.length - 1];
			const food = foodDot;

			if (head[0] === food[0] && head[1] === food[1]) {
				setFoodDot(getRandomCoordinates());
				enlargeSnake();
				increaseSpeed();
				if (feedType === 0) {
					setCount(count + STRAWBERRY);
				}
				if (feedType === 1) {
					setCount(count + HAMBURGER);
				}
				if (feedType === 2) {
					setCount(count + MEAT);
				}
				setFeedType(getRandomFeedType());
			}
		}

		checkIfEat();
		checkIfOutOfBorders();
		checkIfCollapsed();
	},[direction, feedType, foodDot, count, setAlive, setDirection, setName, snakeDots, speed, setCount, START, END, RIGHT, DOWN, UP, LEFT])

	useEffect(() => {
		if (isOver) {
			try {
				addPlayer(api, { name, count });
				alert(`${name}, the game is over! Your score is ${count}`);
				setAlive(false);
				setName('');
				setCount(0);
				setIsOver(false);
			} catch (error) {
				console.log(error)
			}
		}
	}, [count, isOver, name, postPlayer, setAlive, setCount, setName])

	return (
		<Container>
			{alive
				?   <Wrapper>
						<Snake snakeDots={snakeDots} />
						<Food foodDot={foodDot} feedType={feedType}/>
					</Wrapper>
				:   <FormPlayer/>
			}
			<PlayersList points={count} playerName={name}/>
		</Container>
	);
};

export default App;
