import React from 'react';
import axios from 'axios';

import { SERVER, PORT } from '../config';
import game from './game';
import './home.css';

const listGamesURL = `${SERVER}:${PORT + 1}/games/${game.name}`;
const createGameURL = `${SERVER}:${PORT + 1}/games/${game.name}/create`;
const joinGameURL = (gameID) => `${SERVER}:${PORT + 1}/games/${game.name}/${gameID}/join`;
const availableSlots = (game) => game.players.filter((e) => !e.name);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: 2, //number of players
      games: [], //list of game instances
      gameIndex: 0, //index of selected game instance
      playerName: '', //player name
    };

    this.handleChange = this.handleChange.bind(this);
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    this.listGames(); //init list of game instances
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Return the selected game instance
  game() {
    return this.state.games[this.state.gameIndex];
  }

  // Get list of game instances from server
  listGames() {
    axios
      .get(listGamesURL)
      .then(({ data }) => this.setState({ games: data.gameInstances }))
      .catch((err) => console.log(err));
  }

  // Create a new game instance
  createGame(e) {
    e.preventDefault();
    axios
      .post(createGameURL, { numPlayers: this.state.numPlayers })
      .then(() => this.listGames())
      .catch((err) => console.log(err));
  }

  // Join a game
  joinGame(e) {
    e.preventDefault();
    const slots = availableSlots(this.game());
    this.joinGameRequest(slots[Symbol.iterator]());
  }

  // Automatically re-request if playerID
  // is occupied until there is no more room
  joinGameRequest(slots) {
    const slot = slots.next();
    if (!slot.done) {
      const state = {
        playerID: slot.value.id,
        playerName: this.state.playerName,
      };

      axios
        .post(joinGameURL(this.game().gameID), state)
        .then(({ data }) => {
          console.log(data);
          this.listGames();
          //TODO: navigate to route /story with info(credential, gameID,...)
        })
        .catch((err) => {
          if (!err.response) console.log(err);
          else if (err.response.status === 409) this.joinGameRequest(slots);
          else alert(err.response.data);
        });
    } else {
      alert('Story full');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createGame}>
          <label>Number of Writers</label>
          <input
            type="number"
            name="numPlayers"
            min="2"
            max="10"
            value={this.state.numPlayers}
            onChange={this.handleChange}
          />
          <input type="submit" value="Create Story" />
        </form>
        <form autoComplete="off" onSubmit={this.joinGame}>
          <label>Story List</label>
          <select
            name="gameIndex"
            value={this.state.gameIndex}
            onChange={this.handleChange}
            size={this.state.games.length}
          >
            {this.state.games.map((e, i) => (
              <option key={i} value={i}>
                ({e.players.length - availableSlots(e).length}/{e.players.length}) - {e.gameID}
              </option>
            ))}
          </select>
          <br />
          <label>Writer Name</label>
          <input type="text" name="playerName" value={this.state.playerName} onChange={this.handleChange} required />
          <input type="submit" value="Join Story" />
        </form>
      </div>
    );
  }
}

export default Home;
