import PropTypes from 'prop-types';
import { ContainerStyled } from './Container.styled.js';

const Container = ({ children, external, flex, justifyCenter, column, center }) => {
  return (
    <ContainerStyled
      external={external}
      flex={flex}
      justifyCenter={justifyCenter}
      column={column}
      center={center}>
        {children}
    </ContainerStyled>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  external: PropTypes.bool,
  flex: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  column: PropTypes.bool,
  center: PropTypes.bool
};

export default Container;