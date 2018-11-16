import React from 'react';
import { Client } from 'boardgame.io/react';

import { SERVER, PORT, DEBUG } from '../config';
import game from './game';
import board from './board';

const CreativeCollabClient = Client({
  game,
  board,
  multiplayer: { server: `${SERVER}:${PORT}` },
  debug: DEBUG,
});

class Story extends React.Component {
  render() {
    return <CreativeCollabClient />;
  }
}

export default Story;
