import React, { Component } from 'react';
import { List, Write } from 'containers/Post'
import { PostWrapper } from 'components/Post'


class Home extends Component {

    render () {
        return (
            <PostWrapper>
                <Route path="/post/list" component={List} />
                <Route path="/post/write" component={Write} />
            </PostWrapper>
        );
    }
}

export default Home;