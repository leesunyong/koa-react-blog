import React, { Component } from 'react';

import { PageTitle, PostContent } from 'components/Post';

import { postList } from 'lib/api/post'


class List extends Component {

    constructor(props) {
        super(props);
        this.state = {itemNum: 3, list: []}; // 3: initial number of posts.
    }

    componentDidMount() {
        this.getPostList();
        window.addEventListener('scroll', this.infiniteScroll, true);
    }

    getPostList = async () => {
        try {
            let itemNum = this.state.itemNum;
            const result = await postList({ itemNum });
            let list = JSON.parse(result.request.response);
            itemNum = list.length;
            this.setState({itemNum, list});

        } catch (e) {
            console.log("An error occured.");
        }
    }

    editPost = (_id) => {
        const { history } = this.props;
        history.push('/post/update?'+_id);
    }

    deletePost = () => {
        const itemNum = this.state.itemNum - 1;
        this.setState({ itemNum });
        this.getPostList();
    }

    infiniteScroll = () => {

        const documentElement = document.documentElement;
        const body = document.body;

        const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
        const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
        const clientHeight = documentElement.clientHeight;

        if (scrollHeight === scrollTop + clientHeight) {
            const itemNum = this.state.itemNum + 3;
            this.setState({ itemNum })
            this.getPostList();
        }
    }

    render (){
        return (
            <div>
                <PageTitle
                    to="/post/write"
                    title="글 목록"
                    button="글 쓰기"
                />
                {this.state.list.map((post, index) => {
                    return (
                        <PostContent
                            key={ index }
                            post={ post }
                            editPost={ this.editPost }
                            deletePost={ this.deletePost }
                        />
                    );
                })}
            </div>
        );
    }
}


export default List;