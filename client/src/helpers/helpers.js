import { inputs } from '../constants/inputs';
import { buttons } from '../constants/buttons';

const { KEYS, DIRECTIONS } = buttons;
const { UP, DOWN, RIGHT, LEFT, PAUSE } = DIRECTIONS;

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

export { changeDirection, moveSnake, getErrorMessage };