import React, { Component } from 'react';
import styled from 'styled-components';
import { deletePost } from 'lib/api/post'

import Editor from "draft-js-plugins-editor"
import { styleMap, getBlockStyle } from "./blockStyles/BlockStyles";
import { mediaBlockRenderer } from 'components/Post/entities/mediaBlockRenderer'
import { EditorState, convertFromRaw } from 'draft-js';



const Title = styled.p`
    font-size: 14.5px;
    line-height: 20px;
    height: 20px;
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

        this.state = {
            noteTitle: this.props.value.title,
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.value.content))),
        };
    }

    deletePost = async () => {
        try {
            const id = this.props.value._id;
            await deletePost({id});
            this.props.deletePost();
        } catch (e) {
            console.log("알 수 없는 에러 발생");
        }
    }

    editPost = () => {
        this.props.editPost(this.props.value._id);
    }

    render() {
        return (
            <div className="editorContainer">
                <div className="aboveEditor">
                    <span className="noteTitle">
                        <Title>
                            {this.state.noteTitle + " ("}
                            {this.props.value.writer.username + " "}
                            {this.props.value.writtenAt + ")"}
                        </Title>
                    </span>
                    <button className="submitNote" onClick={this.deletePost}>
                        삭제
                    </button>
                    <button className="submitNote" onClick={this.editPost} >
                        수정
                    </button>
                </div>
                
                <div className="editors">
                    <Editor
                        readOnly={true}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}

                        editorState={this.state.editorState}

                        plugins={this.plugins}
                        handleKeyCommand={this.handleKeyCommand}
                        blockRendererFn={mediaBlockRenderer}
                        blockStyleFn={getBlockStyle}
                        ref="editor"
                    />
                </div>
            </div>
        )
    }
}

export default PostContent;