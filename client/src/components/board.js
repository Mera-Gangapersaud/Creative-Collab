import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import StoryBoard from './storyBoard';
import './board.css';

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
      disconnected = <div>Disconnected!</div>;
    }

    return (
      <div>
        <br />
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" id="players-container">
            <h4>Player 1</h4>
            <h4>Player 2</h4>
          </div>
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <StoryBoard story={this.props.G.storySoFar} />
          </div>
        </div>
        {disconnected}
        <br />
        <div className="row">
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              theme={this.isActive() ? 'snow' : 'bubble'}
              className="editor"
            />
          </div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <button className="send-button" onClick={() => this.onDone()}>
              Tell Tale
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
