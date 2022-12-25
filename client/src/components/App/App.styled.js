import styled from "styled-components";

const Title = styled.h1`
	margin: 0 auto;
	font-weight: 500;
`;

const Wrapper = styled.section`
	position: relative;
	height: 30rem;
	width: 30rem;
	background: #333;
	border: 1px solid #6e7888;
  	border-radius: 4px;
	box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
	overflow: hidden;
`;

export { Title, Wrapper };
