import { useState, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { directionContext } from '../../context/DirectionContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { buttons } from '../../constants/buttons';
import { inputs } from '../../constants/inputs';
import { Form, Input, Button } from './Form.styled';

const FormPlayer = () => {
	const { VALUES, TYPES, DIRECTIONS } = buttons;
	const { PLAY, PLAY_AGAIN} = VALUES;
	const { RIGHT } = DIRECTIONS;
	const { INPUT_NAME } = inputs;
	const { TYPE, NAME, PLACEHOLDER, PATTERN } = INPUT_NAME;
	const { setName, setCount } = useContext(playerContext);
	const { setDirection } = useContext(directionContext);
	const { setAlive } = useContext(aliveContext);
	const [buttonValue, setButtonValue] = useState(PLAY);
	const [inputState, setInputState] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		setName(inputState);
		setDirection(RIGHT);
		setButtonValue(PLAY_AGAIN);
		setCount(0);
		setAlive(true);
	};

	const handleChange = e => {
		const { value } = e.currentTarget;
		setInputState(value);
		setName(value);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type={TYPE}
				name={NAME}
				value={inputState}
				onChange={handleChange}
				placeholder={PLACEHOLDER}
				pattern={PATTERN}
				required
			/>
			<Button type={TYPES.SUBMIT}>{buttonValue}</Button>
		</Form>
	);
};

export default FormPlayer;
