import styled from 'styled-components';

const FormPlayer = styled.form`
max-width: 600px;
margin: 0 auto;
text-align: center;
padding: 10px;
  `;
const Input = styled.input`
margin: 0 10px 0 0;
padding: 2px;
`;
const Button = styled.button`
margin: 0;
padding: 5px;
border: 1px solid black;
border-radius: 4px;
color:white;
background-color: #272829;
cursor: pointer;
`;

export { FormPlayer, Input, Button };