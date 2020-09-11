import React, { Component } from 'react';

import styled from 'styled-components';


const Positioner = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
`;

class PostWrapper extends Component {
    render () {
        return (
            <Positioner>
                {this.props.children}
            </Positioner>
        )
    }
}

export default PostWrapper;