import React, { Component } from 'react';
import styled from 'styled-components';
import { deletePost } from 'lib/api/post'

import Editor from "draft-js-plugins-editor"
import { styleMap, getBlockStyle } from "./blockStyles/BlockStyles";
import { mediaBlockRenderer } from 'components/Post/entities/mediaBlockRenderer'
import { EditorState, convertFromRaw } from 'draft-js';
import createHighlightPlugin from './plugins/highlightPlugin'

import { Button } from '@material-ui/core';

const highlightPlugin = createHighlightPlugin();

const Title = styled.span`
    font-size: 17.5px;
    letter-spacing: 0.7px;
    font-family: "Open Sans";
    border-bottom: #f6f7fb solid 2px;
    border-top: none;
    border-left: none;
    border-right: none;
    width: 80%;
    position: inline;
    padding: 0.5em;
    margin-left: 0.6em
`;

class PostContent extends Component {

    constructor (props) {
        super(props);

        const { _id, title, writer, writtenAt } = this.props.value;
        this.state = {
            _id, title, writer, writtenAt,
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.value.content))),
        };

        this.plugins = [ highlightPlugin ];
        this.editorRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const value = this.props.value;
        if (value !== prevProps.value) {
            const { _id, title, writer, writtenAt, content } = value;
            this.setState({ _id, title, writer, writtenAt,
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content))),
            });
        }
    }

    deletePost = async () => {
        try {
            const _id = this.state._id;
            await deletePost({_id});
            this.props.deletePost();
        } catch (e) {
            console.log("알 수 없는 에러 발생");
        }
    }

    editPost = () => {
        this.props.editPost(this.props.value._id);
    }

    onChnage = () => {

    }

    render() {
        return (
            <div className="editorContainer">
                <div className="aboveEditor">
                    <span className="noteTitle">
                        <Title>
                            {this.state.title + " ("}
                            {this.state.writer.username + " "}
                            {this.state.writtenAt + ")"}
                        </Title>
                    </span>
                    <span style={{float: 'right'}}>
                        <Button variant="contained" color="primary" onClick={this.editPost}>
                            수정
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.deletePost}>
                            삭제
                        </Button>
                    </span>
                </div>
                
                <div className="editors">
                    <Editor
                        readOnly={true}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}

                        editorState={this.state.editorState}

                        onChange={this.onChnage}
                        plugins={this.plugins}
                        handleKeyCommand={this.handleKeyCommand}
                        blockRendererFn={mediaBlockRenderer}
                        ref={this.editorRef}
                    />
                </div>
            </div>
        )
    }
}

export default PostContent;