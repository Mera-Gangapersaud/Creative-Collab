import React from 'react';

class StoryBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="border border-success" dangerouslySetInnerHTML={{ __html: this.props.story.join('') }} />
    )
  }
}

export default StoryBoard;
