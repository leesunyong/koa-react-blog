import React, { Component } from 'react';
import {Editor, EditorState, ContentState, convertToRaw} from 'draft-js';

const styles = {
    editor: {
        width: '1000px',
        border: '1px solid gray',
        minHeight: '8em'
    }
};


class PostEditor extends Component {
    constructor(props) {
        super(props);
        
        this.state = {editorState: EditorState.createEmpty()};
        

        this.setEditor = (editor) => {
            this.editor = editor;
        };
    
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (editorState) {
        this.setState({editorState});

        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks
            .map(block => (!block.text.trim() && '\n') || block.text)
            .join('\n');
    }

    componentDidMount() {
        this.setState({editorState:EditorState.createWithContent(ContentState.createFromText(this.props.content))});
        this.focusEditor();
        console.log(this.props.content);
    }

    render() {
        return (
        <div style={styles.editor} onClick={this.focusEditor}>
            <Editor
                value="text"
                ref={this.setEditor}
                editorState={this.state.editorState}
                onChange={this.handleChange}
            />
        </div>
        );
    }
}


export default PostEditor;