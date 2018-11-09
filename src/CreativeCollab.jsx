import React from 'react';
import TextEditor from './TextEditor';
import './CreativeCollab.css';

class CreativeCollab extends React.Component {
    constructor(){
        super();
        this.state = {
            story: ''
        };

        this.addTextFromFirstEditor = this.addTextFromFirstEditor.bind(this);
        this.addTextFromSecondEditor = this.addTextFromSecondEditor.bind(this);
    }

    addTextFromFirstEditor(){
        let story = this.state.story + this.firstEditor.state.text;
        this.setState({
            story: story
        }, console.log(this.state.story));
    }

    addTextFromSecondEditor(){
        let story = this.state.story + this.secondEditor.state.text;
        this.setState({
            story: story
        }, console.log(this.state.story));
    }

    render() {
        return (
            <React.Fragment>
                <div className="editor-container">
                    <TextEditor handleChange={this.addTextFromFirstEditor}
                        ref={instance => { this.firstEditor = instance; }} />
                    <TextEditor handleChange={this.addTextFromSecondEditor}
                        ref={instance => { this.secondEditor = instance; }}/>
                </div>
                <div className="story-container"  dangerouslySetInnerHTML={{ __html: this.state.story }} /> 
            </React.Fragment>
        );
    }
}

export default CreativeCollab;
