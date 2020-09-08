import React, { Component } from 'react';
import {Editor, EditorState, convertToRaw} from 'draft-js';

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
        this.onChange = (editorState) => {
            this.setState({editorState});
            
            const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
            const value = blocks.map(block =>
                (!block.text.trim() && '\n') || block.text).join('\n');
            this.props.onChange(value);
        }
        this.setEditor = (editor) => {
            this.editor = editor;
        };
    
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };
    }

    componentDidMount() {
        this.focusEditor();
    }

    render() {
        return (
        <div style={styles.editor} onClick={this.focusEditor}>
            <Editor
                ref={this.setEditor}
                editorState={this.state.editorState}
                onChange={this.onChange}
            />
        </div>
        );
    }
}


export default PostEditor;