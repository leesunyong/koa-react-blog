import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { WriteButton } from 'components/Post'


const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

class PostContentTitle extends Component {
    
    render() {
        return (
            <div>
                <Title>{this.props.title}</Title>
                <WriteButton/>
                {this.props.children}
            </div>
        )
    }
}

export default PostContentTitle;