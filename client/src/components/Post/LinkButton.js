import React, { Component } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';


const BorderedButton = styled(Link)`
    margin: 1rem;
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

    display: inline-block;

    $:active {
        transform: translateY(3px);
    }
`;


class WriteButton extends Component {
    render() {
        return (
            <BorderedButton to={this.props.to}>
                {this.props.children}
            </BorderedButton>
        );
    }
}


export default WriteButton;