import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 1rem;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    
    width: 10%;
    color: #000;
    border: 1px solid;
    border-radius: 2px;

    text-align: center;
    font-weight: 400;
    text-decoration: none;
    
    cursor:pointer;
    transition: .2s all;

    $:active {
        transform: translateY(3px);
    }
`;


class Button extends Component {

    render() {
        return (
            <Wrapper onClick = {this.props.onClick}>
                {this.props.children}
            </Wrapper>
        );
    }
}

export default Button;