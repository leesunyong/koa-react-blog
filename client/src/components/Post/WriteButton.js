import React, { Component } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';


const BorderedButton = styled(Link)`
    font-weight: 400;
    color: #000;
    border: 1px solid;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor:pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;

    $:active {
        transform: translateY(3px);
    }
`;


class WriteButton extends Component {
    render() {
        return (
            <BorderedButton to="/post/write">
                새 글 작성
            </BorderedButton>
        );
    }
}


export default WriteButton;