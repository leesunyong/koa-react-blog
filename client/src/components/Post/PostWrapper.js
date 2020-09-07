import React from 'react';
import styled from 'styled-components';


const Positioner = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;


const PostWrapper = ({children}) => (
    <Positioner>
        {children}
    </Positioner>
)