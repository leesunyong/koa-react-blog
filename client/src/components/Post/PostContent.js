import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, CenterAlignedWrapper, LinkButton } from 'components/Post';
import oc from 'open-color';
import { deletePost } from 'lib/api/post'

const Wrapper = styled.div`
    width: 1000px;
    margin-top: 100px;
    padding: 20px 20px 0 20px;
    border: 1px solid #000
`;

const Title = styled.div`
    width: 100%,

    font-size: 20px;
    font-weight: 500;
    color: ${oc.gray[8]};
    text-align: center;
    
    margin-bottom: 1rem;
`;

const Content = styled.div`
    width: 100%,
    font-size:16px;
    font-weight: 300;
    color: #000;
    margin-bottom: 1rem;   
    min-height: 3rem;
`;

const PostInfo = styled.div`
    text-align: center;
`;

class PostContent extends Component {

    constructor (props) {
        super(props);
        
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = async () => {
        try {
            const id = this.props.value._id;
            await deletePost({id});
            this.props.onClick();
        } catch (e) {
            console.log("알 수 없는 에러 발생");
        }
    }
    
    render() {
        return (
            <Wrapper>
                <Title>
                    {this.props.value.title}
                </Title>
                <PostInfo>
                    {this.props.value.writer.username + " "}
                    {this.props.value.writtenAt}
                </PostInfo>
                <Content>
                    {this.props.value.content}
                </Content>
                <CenterAlignedWrapper>
                    <LinkButton to={"/post/update?" + this.props.value._id}>
                        수정
                    </LinkButton>
                    <Button onClick={this.handleDelete} to="/post/list">
                        삭제
                    </Button>
                </CenterAlignedWrapper>
            </Wrapper>
        )
    }
}

export default PostContent;