import React, { Component } from 'react';
import { PageTitle, PostEditor, Button, CenterAlignedWrapper, InputWithLabel, LinkButton } from 'components/Post';
import { writePost } from 'lib/api/post'
import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 30px 0 30px 0;
`;

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            writer: {
                username: ''
            },
            displayedPost: {
                title: '',
                content: ''
            }
        };
    }

    updateNote = async (title, content) => {
        const displayedPost = {title, content};
        this.setState({displayedPost});

        try {
            const { history } = this.props;
            const { writer } = { username: "admin" };
            
            await writePost({ writer, title, content });

            history.push('/post/list');
        } catch (e) {
            console.log("알 수 없는 에러가 발생했습니다.");
        }
    }

    cancel = () => {
        const { history } = this.props;
        history.push('/post/list');
    }

    render () {

        return (
            <Wrapper>
                <PageTitle
                    title="글 쓰기"
                    to="/post/list"
                    button="글 목록"
                />
                <PostEditor
                    displayedPost={this.state.displayedPost}
                    updateNote={this.updateNote}
                    cancel={this.cancel}/>
            </Wrapper>
        );
    }
}


export default Write;