import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { GiStrawberry } from 'react-icons/gi';
import { FaHamburger } from 'react-icons/fa';
import { TbMeat } from 'react-icons/tb';
import { icons } from '../../constants/icons';
import { FoodItem } from './Food.styled.js';

const Food = ({ foodDot, feedType })=> {
	const { COLORS, CLASSES } = icons;
	const { STRAWBERRY, HAMBURGER, MEAT } = COLORS;
	const { FOOD } = CLASSES;

	return (
		  	<FoodItem top={`${foodDot[1]}rem`} left={`${foodDot[0]}rem`} >
				{feedType === 2 &&
					<IconContext.Provider value={{ className: `${FOOD}` }}>
						<TbMeat color={MEAT} />
					</IconContext.Provider>}
				{feedType === 1 &&
					<IconContext.Provider value={{ className: `${FOOD}` }}>
						<FaHamburger color={HAMBURGER} />
					</IconContext.Provider>}
				{feedType === 0 &&
					<IconContext.Provider value={{ className: `${FOOD}` }}>
						<GiStrawberry color={STRAWBERRY} />
					</IconContext.Provider>}
			</FoodItem>
	);
}

Food.propTypes = {
	foodDot: PropTypes.array.isRequired,
	feedType: PropTypes.node.isRequired
};

export default Food;