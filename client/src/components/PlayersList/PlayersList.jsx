import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { fetchPlayers } from '../../utils/utils';
import * as api from '../../service/api';
import Container from '../Container';
import { Title, List, ListItem, Item } from './PlayersList.styled';

const PlayersList = ({ points, playerName }) => {
  const { name, setName, count, setCount } = useContext(playerContext);
  const { alive } = useContext(aliveContext);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    try {
      fetchPlayers(api).then(playersScores => setPlayers(playersScores));
    } catch (error) {
      console.log(error)
    }
  }, [alive]);

  useEffect(() => {
    setName(playerName);
    setCount(points);
  }, [playerName, points, setCount, setName]);

  return (
    <Container center>
      <Title>Current player</Title>
      <Container flex>
        {name
            ? (<>
                <Item current>{name}</Item>
                <Item current>{count}</Item>
              </>)
            : <Item current>No player</Item>
        }
      </Container>
      <Container flex column>
        <Title margin>Champions</Title>
        <List>
          <ListItem>
            <Item>Name</Item>
            <Item>Score</Item>
          </ListItem>
          { players?.map(({ id, name, score }) => (
              <ListItem key={id}>
                <Item>{name}</Item>
                <Item>{score}</Item>
              </ListItem>
          ))}
        </List>
      </Container>
    </Container>
  );
};

PlayersList.propTypes = {
  points: PropTypes.number,
  playerName: PropTypes.string.isRequired
};

export default PlayersList;
