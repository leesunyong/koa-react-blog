import React, { Component } from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class CenterAlignedWrapper extends Component {

    render () {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        )
    }
}

export default CenterAlignedWrapper;