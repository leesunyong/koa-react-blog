import React, { Component } from 'react';
import { PageTitle, PostEditor, Button, CenterAlignedWrapper, InputWithLabel, LinkButton, PageContainer } from 'components/Post';
import { writePost } from 'lib/api/post'
import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 30px 0 30px 0;
`;

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = { title : '', content : ''};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    writeHandle = async () => {
        const { history } = this.props;

        try {
            const { title, content } = this.state;
            const writer = { username: "admin" };
    
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
        this.setState({ content : text });
    }


    render () {

        return (
            <Wrapper>
                <PageTitle
                    title="글 쓰기"
                    to="/post/list"
                    button="글 목록"
                />
                <InputWithLabel
                    label="제목"
                    name="title"
                    onChange={this.handleTitleChange}
                />
                <PostEditor onChange={this.handleContentChange}/>
                <PageContainer />
                <CenterAlignedWrapper>
                    <Button onClick={this.writeHandle}>
                        저장
                    </Button>
                    <LinkButton to="/post/list">
                        취소
                    </LinkButton>
                </CenterAlignedWrapper>
            </Wrapper>
        );
    }
}


export default Write;