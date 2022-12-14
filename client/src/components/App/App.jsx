import { Title } from './App.styled';
import Container from '../Container';
import Form from '../Form';
import GameBoard from '../GameBoard';
import PlayersList from '../PlayersList';

const App = () => {
  return (
    <>
      <Title>The Game</Title>
      <Form />
      <Container>
        <GameBoard />
        <PlayersList />
      </Container>
    </>
  );
};
export default App;
