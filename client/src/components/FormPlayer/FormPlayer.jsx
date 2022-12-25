import { useState, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { directionContext } from '../../context/DirectionContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { getErrorMessage } from '../../helpers/helpers';
import { buttons } from '../../constants/buttons';
import { inputs } from '../../constants/inputs';
import Container from '../Container/Container';
import snakeImage from '../../images/snake.jpg';
import { Title, Image, Form, Input, Error, Button } from './Form.styled';

const FormPlayer = () => {
	const { VALUES, TYPES, DIRECTIONS } = buttons;
	const { PLAY, PLAY_AGAIN} = VALUES;
	const { RIGHT } = DIRECTIONS;
	const { INPUT_NAME } = inputs;
	const { TYPE, NAME, PLACEHOLDER, PATTERN, LENGTH, ERROR_TYPES } = INPUT_NAME;
	const { MAX, MISMATCH } = ERROR_TYPES;
	const { setName, setCount } = useContext(playerContext);
	const { setDirection } = useContext(directionContext);
	const { setAlive } = useContext(aliveContext);
	const [buttonValue, setButtonValue] = useState(PLAY);
	const [inputState, setInputState] = useState('');
	const [errorType, setErrorType] = useState(null);

	const handleSubmit = e => {
		e.preventDefault();
		if (errorType === MAX) {
			return;
		}
		if (PATTERN.test(inputState)) {
			setName(inputState);
			setDirection(RIGHT);
			setButtonValue(PLAY_AGAIN);
			setCount(0);
			setAlive(true);
		} else {
			setErrorType(MISMATCH);
		}
	};

	const handleChange = e => {
		const { value } = e.currentTarget;
		setInputState(value);
		if (value.length <= LENGTH) {
			setErrorType(null);
			setName(value);
		} else {
			setErrorType(MAX);
		}
	};

	return (
		<Container flex column>
			<Title margin>Please enter your name</Title>
			<Image>
				<img src={snakeImage} alt="snake" />
			</Image>
			<Form onSubmit={handleSubmit}>
				<Input
					type={TYPE}
					name={NAME}
					value={inputState}
					onChange={handleChange}
					placeholder={PLACEHOLDER}
					required
				/>
				{errorType ? <Error error>{getErrorMessage(errorType, LENGTH)}</Error> : <Error/>}
				<Button type={TYPES.SUBMIT}>{buttonValue}</Button>
			</Form>
		</Container>
	);
};

export default FormPlayer;
