import React, { Component } from 'react';
import { PageTitle, PostEditor, Button, InputWithLabel, LinkButton } from 'components/Post';
import { getPost, writePost } from 'lib/api/post'
import styled from 'styled-components';

const BottomWrapper = styled.div`
    
`;


class Update extends Component {

    constructor(props) {
        super(props);
        this.state = { id : '', title : '', content : ''};

        this.updateHandle = this.updateHandle.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    componentDidMount() {
        this.updateHandle();
    }

    updateHandle = async () => {
        const id = this.props.location.search.slice(1);
        this.setState({id});

        try {
            const result = await getPost({id});
            const {_id, title, content} = result.data[0];

            this.setState({_id, title, content})
        } catch (e) {
            console.log("알 수 없는 에러가 발생했습니다.");
        }
    }

    writeHandle = async () => {
        const { history } = this.props;

        try {
            const { title, content } = this.state;
            const writer = {username: "admin"};
    
            await writePost({writer, title, content});

            history.push('/post/list');
        } catch (e) {
            console.log("알 수 없는 에러가 발생했습니다.");
        }
    }

    handleTitleChange (event) {
        this.setState({ title : event.target.value });
    }

    handleContentChange (text) {
    }


    render () {

        console.log(this.state.content);
        return (
            <div>
                <PageTitle
                    title="글 수정"
                    to="/post/list"
                    button="글 목록"
                />
                <InputWithLabel
                    label="제목"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <PostEditor onChange={this.handleContentChange} content={this.state.content}/>
                <BottomWrapper>
                    <Button onClick={this.writeHandle}>
                        수정
                    </Button>
                    <LinkButton to="/post/list">
                        취소
                    </LinkButton>
                </BottomWrapper>
            </div>
        );
    }
}


export default Update;