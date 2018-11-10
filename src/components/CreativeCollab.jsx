import React from 'react';
import TextEditor from './TextEditor';
import './CreativeCollab.css';

class CreativeCollab extends React.Component {
  constructor() {
    super();
    this.state = {
      story: '',
    };

    this.updateStory = this.updateStory.bind(this);
  }

  updateStory(newText) {
    this.setState({
      story: this.state.story + newText,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="editor-container">
          <TextEditor
            handleChange={() => this.updateStory(this.firstEditor.state.text)}
            ref={(instance) => {
              this.firstEditor = instance;
            }}
          />
          <div className="story-container" dangerouslySetInnerHTML={{ __html: this.state.story }} />
          <TextEditor
            handleChange={() => this.updateStory(this.secondEditor.state.text)}
            ref={(instance) => {
              this.secondEditor = instance;
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CreativeCollab;
