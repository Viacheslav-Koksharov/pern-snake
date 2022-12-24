import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { playerContext } from '../../context/PlayerContextProvider';
import { aliveContext } from '../../context/AliveContextProvider';
import { fetchPlayers } from '../../helpers/helpers';
import * as api from '../../service/api';
import { CurrentPlayer, List, ListItem, Item } from './PlayersList.styled';

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
    <List>
      <CurrentPlayer>
        {name
          ? (<>
              <Item>{name}</Item>
              <Item>{count}</Item>
            </>)
          : <Item>No player</Item>
        }
      </CurrentPlayer>
        Champions
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
  );
};

PlayersList.propTypes = {
  points: PropTypes.number,
  playerName: PropTypes.string.isRequired
};

export default PlayersList;
