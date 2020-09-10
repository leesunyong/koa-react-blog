import React, { Component } from 'react';
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from './plugins/highlightPlugin'
import { mediaBlockRenderer } from 'components/Post/entities/mediaBlockRenderer'
import { InlineStyles } from 'components/Post'

import {
    styleMap,
    getBlockStyle,
    BlockStyleControls
} from "./blockStyles/BlockStyles";


const highlightPlugin = createHighlightPlugin();

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            noteTitle: ""
        };
        
        this.plugins = [ highlightPlugin ];
    }

    onChange = (editorState) => {
        
        if (editorState.getDecorator() !== null) {
            this.setState({ editorState });
        }
    }
    
    submitEditor = () => {
        let contentState = this.state.editorState.getCurrentContent()
        let note = {title: this.state.noteTitle, content: convertToRaw(contentState)}
        if (this.state.noteTitle === "" || (note.content.blocks.length <= 1 && note.content.blocks[0].depth === 0 && note.content.blocks[0].text === "")) {
            alert("Note cannot be saved if title or content is blank")
        } else {
            note["content"] = JSON.stringify(note.content)
            this.props.updateNote(note.title, note.content);
        }
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
        this.setState({
            noteTitle: "",
            editorState: EditorState.createEmpty(this.decorator())
        });
    }

    componentDidUpdate(prevProps) {
        const displayedPost = this.props.displayedPost;
        if (displayedPost !== prevProps.displayedPost) {
            this.setState({
                noteTitle: displayedPost.title,
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(displayedPost.content))),
            });
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
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    
    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    
    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    captureTitle = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({noteTitle: value});
    }

    toggleInlineStyle = (style) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
    }

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };
    
    focus = () => this.refs.editor.focus();
    
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
                            value={this.state.noteTitle}
                            onChange={this.captureTitle}>
                        </input>
                    </span>
                    <button className="submitNote" onClick={this.props.cancel}>
                        취소
                    </button>
                    <button className="submitNote" onClick={this.submitEditor}>
                        저장
                    </button>
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

                        onChange= { this.onChange }
                        plugins={this.plugins}
                        handleKeyCommand={this.handleKeyCommand}
                        blockRendererFn={mediaBlockRenderer}
                        ref="editor"
                    />
                </div>
            </div>
        );
    }
}


export default PostEditor;