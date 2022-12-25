import React, { useState, useEffect, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { directionContext } from '../../context/DirectionContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { getRandomCoordinates, getRandomFeedType, addPlayer } from '../../utils/utils';
import { changeDirection, moveSnake } from '../../helpers/helpers';
import { buttons } from '../../constants/buttons';
import { icons } from '../../constants/icons';
import { fullpoints } from '../../constants/fullpoints';
import * as api from '../../service/api';
import Container from '../Container';
import FormPlayer from '../FormPlayer';
import PlayersList from '../PlayersList';
import Snake from '../Snake';
import Food from '../Food';
import { Title, Wrapper } from './App.styled';

const App = () => {
	const { DIRECTIONS } = buttons;
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
	const [speedLevel, setSpeedLevel] = useState(0);

	useEffect(() => {
		const onKeyDown = (e) => {
			changeDirection(e.keyCode, direction, setDirection, setPause);
		}

		if (alive) {
			document.addEventListener('keydown', onKeyDown);
			return () => {
				document.removeEventListener('keydown', onKeyDown);
			};
		}
	}, [alive, direction, setDirection]);

	useEffect(() => {
		if (pause) {
			return;
		}

		if (alive) {
			const run = setInterval(() => {
				moveSnake(snakeDots, setSnakeDots, direction);
			}, speed);
			return () => clearInterval(run);
		}
	},[alive, direction, pause, snakeDots, speed])

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

		const checkIfEat = () => {
			const { POINTS } = icons;
			const { STRAWBERRY, HAMBURGER, MEAT } = POINTS;
			const head = snakeDots[snakeDots.length - 1];
			const food = foodDot;

			if (head[0] === food[0] && head[1] === food[1]) {
				setFoodDot(getRandomCoordinates());
				enlargeSnake();
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
	},[direction, feedType, foodDot, count, setAlive, setDirection, setName, snakeDots, speed, setCount, START, END, RIGHT, DOWN, UP, LEFT, speedLevel])

	useEffect(() => {
		const level = Math.trunc(count / 50);
		if (level > speedLevel) {
			setSpeedLevel(level);
			setSpeed(speed => speed * 0.9);
		}
	}, [count, speedLevel])

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
		<Container center>
			<Title>You can be a champion! Just try!!!</Title>
			<Container external flex justifyCenter>
			{alive
				?   <Wrapper>
						<Snake snakeDots={snakeDots} />
						<Food foodDot={foodDot} feedType={feedType}/>
					</Wrapper>
				:   <FormPlayer/>
			}
			<PlayersList points={count} playerName={name}/>
			</Container>
		</Container>
	);
};

export default App;
