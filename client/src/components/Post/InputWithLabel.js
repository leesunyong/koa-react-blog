import React, { Component } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`


const Label = styled.div`
    font-size: 1rem;
    margin-bottom: 0.25rem;
`;


const Input = styled.input`
    width: 1000px;
    
    border: 1px solid #000;
    outline: none;

    line-height: 2.5rem;
    font-size: 1.2rem;
`;


class InputWithLabel extends Component {
    render () {
        return (
            <Wrapper>
                <Label>
                    {this.props.label}
                </Label>
                <Input
                    name={this.props.name}
                    onChange={this.props.onChange}
                />
            </Wrapper>
        );
    }
}


export default InputWithLabel;