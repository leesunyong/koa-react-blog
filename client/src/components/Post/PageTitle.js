import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { LinkButton } from 'components/Post'


const Title = styled.div`
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

class PageTitle extends Component {
    
    render() {
        return (
            <div>
                <Title>{this.props.title}</Title>
                <LinkButton to={this.props.to}>{this.props.button}</LinkButton>
                {this.props.children}
            </div>
        )
    }
}

export default PageTitle;