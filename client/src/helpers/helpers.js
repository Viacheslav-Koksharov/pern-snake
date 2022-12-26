import { inputs } from '../constants/inputs';
import { buttons } from '../constants/buttons';
import { fullpoints } from '../constants/fullpoints';
import * as api from '../service/api';

const { KEYS, DIRECTIONS } = buttons;
const { UP, DOWN, RIGHT, LEFT, PAUSE } = DIRECTIONS;
const { START, END } = fullpoints;

const changeDirection = (keyCode, direction, directionCallback, pauseCallback) => {
	switch (keyCode) {
		case KEYS.UP:
			direction !== DOWN && directionCallback(UP);
			break;
		case KEYS.DOWN:
			direction !== UP && directionCallback(DOWN);
			break;
		case KEYS.LEFT:
			direction !== RIGHT && directionCallback(LEFT);
			break;
		case KEYS.RIGHT:
			direction !== LEFT && directionCallback(RIGHT);
			break;
		case KEYS.PAUSE: pauseCallback(pause => !pause);
			   break;
		default:
			break;
	}
}

const moveSnake = (snake, snakeCallback, direction) => {
	const dots = [...snake];
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
			snakeCallback([...snake]);
			break;
		default:
			break;
	}
	dots.push(head);
	dots.shift();
	snakeCallback(dots);
}

const getErrorMessage = (type, length) => {
	const { INPUT_NAME } = inputs;
	const { ERROR_TYPES } = INPUT_NAME;
	const { MAX, MISMATCH } = ERROR_TYPES;
	let message = '';

	switch (type) {
		case MAX:
			message = `The maximum allowed name length is ${length} characters`;
			break;
		case MISMATCH:
			message = `Only letters, space, dash and apostrophe are allowed`;
			break;
		default:
			break;
	}
	return message;
}

const checkIfOutOfBorders = (snake, snakeCallback) => {
	const dots = [...snake];
	let head = snake[snake.length - 1];
	//Out Of Space left
	if (head[1] < START ){
	  head[1] = END;
	  snakeCallback(dots);
	   }
	//Out Of Space right
	if (head[1] > END){
	  head[1] = START;
	  snakeCallback(dots);
	}
	//Out Of Space up
	if (head[0] < START ){
	  head[0] = END;
	  snakeCallback(dots);
	}
	//Out Of Space down
	if (head[0] > END ){
	  head[0] = START;
	  snakeCallback(dots);
	}
}

const checkIfCollapsed = (snake, callBack) => {
	const segments = [...snake];
	const head = snake[snake.length - 1];
	segments.pop();
	segments.forEach(dot => {
		if (head[0] === dot[0] && head[1] === dot[1]) {
			callBack();
		}
	});
}

const increaseSnakeLength = (snake, direction) => {
	const array = [];
	const [dotX, dotY] = snake[0];
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

const fetchPlayers = async () => {
    const { data } = await api.getPlayer();
    return data;
};

const addPlayer = async ({ name, count }) => {
	const { data } = await api.postPlayer({ name, 'score': count });
	return data;
};

export { changeDirection, moveSnake, getErrorMessage, checkIfOutOfBorders, checkIfCollapsed, increaseSnakeLength, fetchPlayers, addPlayer };