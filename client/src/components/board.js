import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import StoryBoard from './storyBoard';
import './creative-collab.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    isPreview: PropTypes.bool,
  };

  handleChange(value) {
    this.setState({ text: value });
  }

  onDone = () => {
    if (this.isActive()) {
      this.props.moves.clickDone(this.state.text);
      this.handleChange('');
    }
  };

  isActive() {
    return this.props.isActive;
  }

  render() {
    let disconnected = null;
    if (this.props.isMultiplayer && !this.props.isConnected) {
      disconnected = "Disconnected";
    }

    return (
      <div>
        <br />
        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" id="players-container">
            <h1 id="collabH1ver">Writers</h1>
            <ul class="list-group">
              <li class="list-group-item"><h5>Player 1</h5></li>
              <li class="list-group-item"><h5>Player 2</h5></li>
            </ul>
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <StoryBoard story={this.props.G.storySoFar} />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              theme={this.isActive() ? 'snow' : 'bubble'}
              className="editor"
            />
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <button class="btn btn-primary" style={{
              marginTop: '50px',
              marginRight: '80px',
              width: '100px',
              height: '50px'
            }}
              onClick={() => this.onDone()}>
              Tell Tale
            </button>
          </div>
        </div>
        <div id="playerinfo-panel" class="alert alert-primary" role="alert">
          <h5>Player Information</h5>
          <b>Player Status: </b> {disconnected}<br></br>
          <b>Player Name:</b>
        </div>
      </div >
    );
  }
}

export default Board;
