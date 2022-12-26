import styled from "styled-components";

const ContainerStyled = styled.div`
    display: ${(props) => (props.flex ? "flex" : "block")};
    flex-direction: ${(props) => (props.column ? "column" : "row")};
    justify-content: ${(props) => (props.justifyCenter ? "center" : "flex-start")};
    width: ${(props) => (props.external ? "90%" : "auto")};
    margin: ${(props) => (props.external ? "0 auto" : "0")};
    padding: ${(props) => (props.external ? "20px" : "10px")};
    text-align: ${(props) => (props.center ? "center" : "start")};
`;

export { ContainerStyled };
