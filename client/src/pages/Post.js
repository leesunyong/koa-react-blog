import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { PageWrapper } from 'components/Post';
import { List, Update, Write } from 'containers/Post';


class Post extends Component {

    render () {
        return (
            <PageWrapper>
                <Route path="/post/list" component={List} />
                <Route path="/post/update" component={Update} />
                <Route path="/post/write" component={Write} />
            </PageWrapper>
        );
    }
}

export default Post;