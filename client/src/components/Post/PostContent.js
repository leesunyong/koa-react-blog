import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    width: 1000px;
    margin-top: 100px;
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
    font-size = 16px;
    font-weight: 300;
    color: #000;
    margin-bottom: 1rem;   
    min-height: 3rem;
    padding: 10px 
`;

class PostContent extends Component {
    
    render() {
        return (
            <Wrapper>
                <Title>
                    {this.props.title}
                </Title>
                <Content>
                    {this.props.content}
                </Content>
            </Wrapper>
        )
    }
}

export default PostContent;