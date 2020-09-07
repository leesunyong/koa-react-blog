import React, { Component } from 'react';
import { MyEditor } from 'components/Post';


class Write extends Component {
    render () {
        return (
            <div>
                Write
                <MyEditor />
            </div>
        );
    }
}


export default Write;