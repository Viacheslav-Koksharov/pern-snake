import styled from "styled-components";

const SnakeItem = styled.div`
	position: absolute;
	height: 2rem;
	width: 2rem;
	background: mediumseagreen;
	border: solid 1px #333;
	z-index: 2;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
`;

export { SnakeItem };
