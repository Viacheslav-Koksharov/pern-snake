import PropTypes from 'prop-types';
import { ContainerStyled } from './Container.styled.js';

const Container = ({ children }) => {
    return (
        <ContainerStyled>{children}</ContainerStyled>
    )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container