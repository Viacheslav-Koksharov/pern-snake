import { useState, useEffect } from 'react';
import { List, ListItem, Item } from './PlayersList.styled';
import * as api from '../../service/api';

const PlayersList = () => {
  const [scores, setScores] = useState();

  const fetchPlayers = async () => {
    const { data } = await api.getPlayer();
    return data;
  };

  useEffect(() => {
    fetchPlayers().then(playersScores => setScores(playersScores));
  }, [scores]);

  return (
    <>
      <List>
        Champions
        <ListItem>
          <Item>Name</Item>
          <Item>Score</Item>
        </ListItem>
        {scores?.map(item => (
          <ListItem key={item.id}>
            <Item>{item.name}</Item>
            <Item>{item.score}</Item>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PlayersList;
