import { useState, useEffect } from 'react';
import {CurrentPlayer, List, ListItem, Item } from './PlayersList.styled';
import * as api from '../../service/api';

const PlayersList = ({points,playerName, onGameOver}) => {
  const [scores, setScores] = useState();
  const [name, setName] = useState();
  const [score, setScorePlayer] = useState();
  // console.log(name);

  const fetchPlayers = async () => {
    const { data } = await api.getPlayer();
    return data;
  };

  // const addPlayers = async ({ name, score }) => {
  //   const { data } = await api.postPlayer({ name, score });
  //   return data;
  // };
 
  useEffect(() => {
    fetchPlayers().then(playersScores => setScores(playersScores));
  }, [scores]);
  
  useEffect(() => {
        setName(playerName);
  setScorePlayer(points);
  },[playerName, points]);

  return (
    <>
      <List>
        <CurrentPlayer>
          {name? (<><Item>{name}</Item><Item>{score}</Item></>):(<Item>No player</Item>)}          
          </CurrentPlayer>
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
