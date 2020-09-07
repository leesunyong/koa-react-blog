import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';


const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

class PostContent extends Component {
    constructor(title) {
        super(title);
        this.title=title;
    }
    
    render() {
        return (
            <div>
                <Title>{this.title}</Title>
            </div>
        )
    }
}

export default PostContent;