import React, { Component } from 'react';
import { PageTitle, PostEditor } from 'components/Post';
import { getPost, updatePost } from 'lib/api/post'
import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 30px 0 30px 0;
`;

class Update extends Component {

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

    componentDidMount() {
        this.updateHandle();
    }

    updateHandle = async () => {
        const id = this.props.location.search.slice(1);
        this.setState({id});

        try {
            const result = await getPost({id});
            const {_id, writer, title, content} = result.data[0];
            const displayedPost = {title, writer, content};
            this.setState({_id, displayedPost})
        } catch (e) {
            console.log("알 수 없는 에러가 발생했습니다.");
        }
    }

    updateNote = async (title, content) => {
        const displayedPost = {title, content};
        this.setState({displayedPost});

        try {
            const { history } = this.props;
            const { id, writer } = this.state;
            
            await updatePost({ id, writer, title, content });

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
                    title="글 수정"
                    to="/post/list"
                    button="글 목록"
                />
                <PostEditor
                    displayedPost={this.state.displayedPost}
                    updateNote={this.updateNote}
                    cancel={this.cancel}
                />
            </Wrapper>
        );
    }
}


export default Update;