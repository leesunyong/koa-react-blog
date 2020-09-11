import React, { Component } from 'react';

import { InlineStyles } from 'components/Post'

import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from './plugins/highlightPlugin'
import { mediaBlockRenderer } from 'components/Post/entities/mediaBlockRenderer'
import { styleMap, getBlockStyle, BlockStyleControls } from "./blockStyles/BlockStyles";

import { Button } from '@material-ui/core';


const highlightPlugin = createHighlightPlugin();


class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            editorState: EditorState.createEmpty()
        };
        
        this.plugins = [ highlightPlugin ];
        this.editorRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            title: "",
            editorState: EditorState.createEmpty(this.decorator())
        });
    }

    componentDidUpdate(prevProps) {
        const displayedPost = this.props.displayedPost;
        if (displayedPost !== prevProps.displayedPost) {
            this.setState({
                title: displayedPost.title,
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(displayedPost.content))),
            });
        }
    }
    
    focus = () => this.refs.editor.focus();

    onTitleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({title: value});
    }

    onEditorChange = (editorState) => {
        if (editorState.getDecorator() !== null) {
            this.setState({ editorState });
        }
    }
    
    submitPost = () => {
        const contentState = this.state.editorState.getCurrentContent()
        let note = {title: this.state.title, content: convertToRaw(contentState)}
        if (this.state.title === "" || (note.content.blocks.length <= 1 && note.content.blocks[0].depth === 0 && note.content.blocks[0].text === "")) {
            alert("Note cannot be saved if title or content is blank")
        } else {
            note["content"] = JSON.stringify(note.content)
            this.props.updateNote(note.title, note.content);
        }
    }

    decorator = () => new CompositeDecorator([{
        strategy: this.linkStrategy,
        component: this.Link,
    }]);

    linkStrategy = (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
            );
        }, callback);
    };
    
    Link = (props) => {
        const { contentState, entityKey } = props;
        const { url } = contentState.getEntity(entityKey).getData();
        return (
            <a
                className="link"
                rel="noopener noreferrer"
                target="_blank"
                aria-label={url}
                href={url}
                >
                {props.children}
            </a>
        );
    };
    
    onUnderlineClick = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    
    onBoldClick = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    
    onItalicClick = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    toggleInlineStyle = (style) => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
    }

    toggleBlockType = (blockType) => {
        this.onEditorChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };
    
    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    
    onAddImage = (e) => {
        e.preventDefault();
        const editorState = this.state.editorState;
        const urlValue = window.prompt('Paste Image Link');
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {src: urlValue});
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity}, 'create-entity');
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
        }, () => {setTimeout(() => this.focus(), 0);});
    }

    render() {
        return (
            <div className="editorContainer">
                <div className="aboveEditor">
                    <span className="noteTitle">
                        <input
                            type="text"
                            placeholder="제목"
                            name="noteTitle"
                            className="noteTitle"
                            value={this.state.title}
                            onChange={this.onTitleChange}>
                        </input>
                    </span>
                    <span style={{float: 'right'}}>
                        <Button variant="contained" color="primary" onClick={this.submitPost}>
                            저장
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.props.cancel}>
                            취소
                        </Button>
                    </span>
                </div>
                <div className="tool-bar">
                    <button className="inline styleButton" onClick={this.onAddImage}>
                        <i className="material-icons">photo</i>
                    </button>

                    <InlineStyles editorState={this.state.editorState} onToggle={this.toggleInlineStyle}/>
                    <BlockStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                    />
                </div>
                <div className="editors">
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}

                        editorState={this.state.editorState}

                        onChange= {this.onEditorChange}
                        plugins={this.plugins}
                        handleKeyCommand={this.handleKeyCommand}
                        blockRendererFn={mediaBlockRenderer}
                        ref={this.editorRef}
                    />
                </div>
            </div>
        );
    }
}


export default PostEditor;