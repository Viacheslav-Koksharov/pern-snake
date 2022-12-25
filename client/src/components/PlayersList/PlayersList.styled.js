import styled from "styled-components";

const Title = styled.h3`
  margin: ${(props) => (props.margin ? "0 auto 20px" : "0")};
  font-weight: 400;
`;

const List = styled.ul`
  width: 350px;
  background-color: #333;
  border: 1px solid #6e7888;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
`;

const ListItem = styled.li`
  display: flex;
  align-content: center;
  padding: 8px;
  color: #f2f5f3;
  background-color: grey;

    :first-child {
      padding: 20px;
    }

    :nth-of-type(2n + 1) {
      background-color: #333;
    }
`;

const Item = styled.p`
  width: 50%;
  margin:0 auto;
  text-align: center;
  color: ${(props) => (props.current ? "#6e7888" : "white")};
  font-size: ${(props) => (props.current ? "18px" : "16px")};
`;

export { Title, List, ListItem, Item };


