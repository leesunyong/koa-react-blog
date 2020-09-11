import React, { Component } from 'react';

import { deletePost } from 'lib/api/post'

import styled from 'styled-components';

import { EditorState, convertFromRaw } from 'draft-js';
import Editor from "draft-js-plugins-editor"
import { mediaBlockRenderer } from 'components/Post/entities/mediaBlockRenderer'
import { styleMap, getBlockStyle } from "./blockStyles/BlockStyles";
import createHighlightPlugin from './plugins/highlightPlugin'

import { Button } from '@material-ui/core';


const Title = styled.span`
    font-size: 17.5px;
    letter-spacing: 0.7px;
    font-family: "Open Sans";
    border-bottom: #f6f7fb solid 2px;
    width: 80%;
    position: inline;
    padding: 0.5em;
    margin-left: 0.6em
`;

const highlightPlugin = createHighlightPlugin();


class PostContent extends Component {

    constructor (props) {
        super(props);

        const post = this.props.post;
        const { _id, title, writer, writtenAt } = post;
        this.state = {
            _id, title, writer, writtenAt,
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(post.content))),
        };

        this.plugins = [ highlightPlugin ];
        this.editorRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const post = this.props.post;
        if (post !== prevProps.post) {
            const { _id, title, writer, writtenAt, content } = post;
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
        this.props.editPost(this.props.post._id);
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
        );
    }
}


export default PostContent;