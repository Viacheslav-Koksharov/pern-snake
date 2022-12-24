import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const Input = styled.input`
  margin: 0 10px 0 0;
  padding: 2px;
`;

const Button = styled.button`
  margin: 0 auto;
  padding: 5px;
  width: 100px;
  border: 1px solid black;
  border-radius: 4px;
  color:white;
  background-color: #272829;
  cursor: pointer;
`;

export { Form, Input, Button };