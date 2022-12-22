import styled from "styled-components";

const Box = styled.form`
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
`;

const Content = styled.span`
	font-size: 1em;
	text-align: center;
	color: #333;
`;

const Input = styled.input`
margin: 0;
padding: 2px;
`;

const Wrapper = styled.section`
	position: relative;
	height: 30rem;
	width: 30rem;
	background: #333;
`;

const Button = styled.button`
	/* Adapt the colors based on primary prop */
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid #333;
	border-radius: 3px;
	background-color: grey;
	color: #f2f5f3;
    font-size: 18px;
    background-color: grey;
`;

export { Box,Content,Input,Wrapper,Button };
