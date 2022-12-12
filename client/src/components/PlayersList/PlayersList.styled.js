import styled from "styled-components";

const List = styled.ul`
width: 300px;
margin:0 0 0 30px;
text-align: center;
color: #f2f5f3;
font-size: 30px;
background-color: #272829;
border: 1px solid black;
`;

const ListItem = styled.li`
display: flex;
align-content: center;
padding: 4px 0;
color: #f2f5f3;
font-size: 18px;
background-color: grey;
  :nth-of-type(2n + 1) {
    background-color: #272829;
  }
`;

const Item = styled.p`
margin:0 auto;
padding: 4px 0;
font-size: 18px;
`;

export { List, ListItem, Item };


