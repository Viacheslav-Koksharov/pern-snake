import styled from "styled-components";

const FoodItem = styled.div`
	position: absolute;
	background-repeat: no-repeat;
	background-size: cover;
	height: 2rem;
	width: 2rem;
	border-radius: 50%;
	z-index: 1;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
`;

export { FoodItem };
