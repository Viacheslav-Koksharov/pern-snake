import PropTypes from 'prop-types';
import { SnakeItem } from './Snake.styled.js';

const Snake = ({ snakeDots }) => {
	return (
	  	<>
			{snakeDots.map((snakeDot, i) => {
				return <SnakeItem
							key={i}
							top={snakeDot[1] ? `${snakeDot[1]}rem` : null}
							left={snakeDot[0] ? `${snakeDot[0]}rem` : null}
						/>;
			})}
	 	</>
	);
};

Snake.propTypes = {
	snakeDots: PropTypes.array.isRequired,
};

export default Snake;