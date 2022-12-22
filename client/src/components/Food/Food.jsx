import { IconContext } from 'react-icons';
import { GiStrawberry } from 'react-icons/gi'; // 1 point
import { FaHamburger } from 'react-icons/fa'; // 5 points
import { TbMeat } from 'react-icons/tb'; // 10 points
import { FoodItem } from './Food.styled.js';

const Food=({foodDot,feedType})=> {
	return (
		  <FoodItem top={`${foodDot[1]}rem`} left={`${foodDot[0]}rem`} >
		  {feedType === 2 && <IconContext.Provider value={{ className: 'react-icons' }}>
              					<TbMeat color="f6085f"/>
             				</IconContext.Provider>}
		 {feedType === 1 && <IconContext.Provider value={{ className: 'react-icons' }}>
              					<FaHamburger color="#b38e07"/>
             				</IconContext.Provider>}
		{feedType === 0 && <IconContext.Provider value={{ className: 'react-icons' }}>
              					<GiStrawberry color="#b30707" />
             				</IconContext.Provider>}
		</FoodItem>
	);
}

export default Food;