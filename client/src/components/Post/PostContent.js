import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';


const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

const Content = styled.div`
    font-size = 1.2rem;
    font-weight: 300;
    color: #000;
    margin-bottom: 1rem;    
`;

class PostContent extends Component {
    
    render() {
        return (
            <div>
                <Title>
                    {this.props.title}
                </Title>
                <Content>
                    {this.props.content}
                </Content>
            </div>
        )
    }
}

export default PostContent;