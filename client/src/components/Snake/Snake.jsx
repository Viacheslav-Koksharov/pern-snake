import { SnakeItem } from './Snake.styled.js';

const Snake = ({ snakeDots }) => {
	return (
	  <>
		{snakeDots.map((snakeDot, i) => {
		  
		  return <SnakeItem key={i} top={`${snakeDot[1]}rem`} left={`${snakeDot[0]}rem`} />;
		})}
	 </>
	);
  };
export default Snake;