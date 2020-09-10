import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, RichUtils} from 'draft-js';
import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from './plugins/highlightPlugin'

const styles = {
    editor: {
        width: '1000px',
        border: '1px solid gray',
        minHeight: '8em'
    }
};

const highlightPlugin = createHighlightPlugin();

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        
        this.plugins = [ highlightPlugin ];

        // this.setEditor = (editor) => {
        //     this.editor = editor;
        // };
    
        // this.focusEditor = () => {
        //     if (this.editor) {
        //         this.editor.focus();
        //     }
        // };

        // this.onChange = this.onChange.bind(this);
    }

    onChange = (editorState) => {
        this.setState({editorState});

        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks
            .map(block => (!block.text.trim() && '\n') || block.text)
            .join('\n');
        this.props.onChange(value);
    }
    
    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    componentDidMount() {
        // this.focusEditor();
    }

    componentDidUpdate(prevProps) {
        if (this.props.content !== prevProps.content) {
            this.setState({
                editorState: EditorState.createWithContent(
                    ContentState.createFromText(this.props.content)
                )
            });
        }
    }
    
    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    
    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    
    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    render() {
        return (
            <div style={styles.editor} onClick={this.focusEditor}>
                <button onClick={this.onUnderlineClick}>U</button>
                <button onClick={this.onBoldClick}><b>B</b></button>
                <button onClick={this.onItalicClick}><em>I</em></button>
                <Editor
                    editorState={this.state.editorState}
                    // handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    plugins={this.plugins}
                />
            </div>
        );
    }
}


export default PostEditor;