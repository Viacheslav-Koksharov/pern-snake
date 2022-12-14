import { useState } from 'react';
import { FormPlayer, Input, Button } from './Form.styled';
import * as api from '../../service/api';

const Form = () => {
  const [name, setNamePlayer] = useState('');
  const [score, setScorePlayer] = useState('');

  const addPlayers = async ({ name, score }) => {
    const { data } = await api.postPlayer({ name, score });
    return data;
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setNamePlayer(value);
        break;
      case 'score':
        setScorePlayer(value);
        break;
      default:
        return;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    addPlayers({ name, score });
    setNamePlayer('');
    setScorePlayer('');
  };

  return (
    <FormPlayer onSubmit={submitForm}>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        type="number"
        name="score"
        value={score}
        onChange={handleChange}
        placeholder="Score"
      />
      <Button type="submit">Submit</Button>
    </FormPlayer>
  );
};
export default Form;
