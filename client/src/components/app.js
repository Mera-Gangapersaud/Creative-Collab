import React from 'react';
import { Client } from 'boardgame.io/react';
import CreativeCollabGame from './game';
import Board from './board';

const App = Client({
  game: CreativeCollabGame,
  board: Board,
  debug: true,
  multiplayer: { server: 'localhost:8000' },
});

const CreativeCollab = () => (
  <div className="container" style={{ padding: 50 }}>
    <h1>CreativeColab</h1>
    <div>
      <div>
        <App gameID="multi" playerID="0" />
        &lt;App playerID=&quot;0&quot;/&gt;
      </div>
    </div>
  </div>
);

export default CreativeCollab;
