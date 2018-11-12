const Server = require('boardgame.io/server').Server;
const CreativeCollabGame = require('./game').CreativeCollabGame;

const server = Server({ games: [CreativeCollabGame] });

const port = 8000;
server.run(port, () => {
  console.log(`Server started on port ${port}`);
});
