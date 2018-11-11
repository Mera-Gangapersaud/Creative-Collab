import React from 'react';

class StoryBoard extends React.Component {
  render() {
    return (
      <div
        className="story-container border border-success"
        dangerouslySetInnerHTML={{ __html: this.props.story.join('') }}
      />
    );
  }
}

export default StoryBoard;
