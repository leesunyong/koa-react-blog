import React, { Component } from 'react';
import styled from 'styled-components';


const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

class PostWrapper extends Component {
    render () {
        return (
            <Positioner>
                HI
                {this.props.children}
            </Positioner>
        )
    }
}

export default PostWrapper;