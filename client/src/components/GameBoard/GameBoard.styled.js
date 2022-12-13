import styled from 'styled-components';

const Board = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 500px;
height: 500px;
justify-content: center;
align-items: center;
background-color: #333;
`;

const Cell = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 20px;
height: 20px;
border: 1px solid black;
`;
export { Board, Cell }