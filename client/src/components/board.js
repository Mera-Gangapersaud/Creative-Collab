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
      disconnected = <div>Disconnected!</div>;
    }

    return (
      <div className="row">
        <div className="col-6">
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            theme={this.isActive() ? 'snow' : 'bubble'}
            className="editor"
          />
          <br />
          <br />
          <br />
          <button onClick={() => this.onDone()}>Done</button>
        </div>

        <div className="col-6">
          <StoryBoard story={this.props.G.storySoFar} />
        </div>
        {disconnected}
      </div>
    );
  }
}

export default Board;
