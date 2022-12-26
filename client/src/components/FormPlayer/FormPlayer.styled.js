import styled from 'styled-components';

const Title = styled.h3`
  margin: ${(props) => (props.margin ? "0 auto 20px" : "0")};
  font-weight: 400;
`;

const Image = styled.div`
  width: 58px;
  margin: 0 auto 20px;
  padding: 4px;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 200px;
  height: 35px;
  margin: 0 auto 5px;
  padding: 5px;
  border: 1px solid #6e7888;
  border-radius: 4px;
  outline: 1px solid #6e7888;
`;

const Error = styled.p`
  width: 200px;
  height: 30px;
  margin: 0 auto 5px;
  white-space: normal;
  font-size: 12px;
  color: ${(props) => (props.error ? "red" : "transparent")};
`;

const Button = styled.button`
  margin: 0;
  padding: 15px;
  border: 1px solid #6e7888;
  border-radius: 4px;
  color: white;
  background-color: #272829;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;

    &:hover {
      background-color: #272819;
      transform: scale(1.01);
    }
`;

export { Title, Image, Form, Input, Error, Button };