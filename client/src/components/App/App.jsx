import React, { useState, useEffect, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { directionContext } from '../../context/DirectionContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { getRandomCoordinates, getRandomFeedType } from '../../utils/utils';
import { changeDirection, moveSnake, checkIfOutOfBorders, checkIfCollapsed, increaseSnakeLength, addPlayer } from '../../helpers/helpers';
import { buttons } from '../../constants/buttons';
import { icons } from '../../constants/icons';
import Container from '../Container';
import FormPlayer from '../FormPlayer';
import PlayersList from '../PlayersList';
import Snake from '../Snake';
import Food from '../Food';
import { Title, Wrapper } from './App.styled';

const App = () => {
	const { DIRECTIONS } = buttons;
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
	}, [alive, direction, pause, snakeDots, speed])

	useEffect(() => {
		const onGameOver = () => {
			setFoodDot([10, 10]);
			setDirection(DIRECTIONS.RIGHT);
			setSpeed(300);
			setSnakeDots([[0, 0], [2, 0]]);
			setIsOver(true);
		}

		const enlargeSnake = () => {
			let newSnake = [...snakeDots];
      		newSnake.unshift(increaseSnakeLength(snakeDots, direction));
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
		checkIfOutOfBorders(snakeDots, setSnakeDots);
		checkIfCollapsed(snakeDots, onGameOver);
	}, [DIRECTIONS.RIGHT, count, direction, feedType, foodDot, setCount, setDirection, snakeDots])

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
				addPlayer({ name, count });
				alert(`${name}, the game is over! Your score is ${count}`);
				setAlive(false);
				setName('');
				setCount(0);
				setIsOver(false);
			} catch (error) {
				console.log(error)
			}
		}
	}, [count, isOver, name, setAlive, setCount, setName])

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
