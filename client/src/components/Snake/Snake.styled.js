import styled from "styled-components";

const SnakeItem = styled.div`
	position: absolute;
	height: 2rem;
	width: 2rem;
	background: rgb(5, 224, 104);
	border: 1px solid #6e7888;
  	border-radius: 4px;
	z-index: 2;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
`;

export { SnakeItem };
