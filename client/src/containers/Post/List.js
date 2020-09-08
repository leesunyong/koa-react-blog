import React, { Component } from 'react';
import { PostContentTitle, PostContent } from 'components/Post';
import { postList } from 'lib/api/post'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as postActions from 'redux/modules/post';


class List extends Component {

    constructor(props) {
        super(props);
        this.state = {list: []};
    }

    componentDidMount() {
        this.handlePostList();
    }

    handlePostList = async () => {
        try {
            const list = await postList();
            const result = JSON.parse(list.request.response);
            this.setState({list: result})
        } catch (e) {
            console.log("An error occured.");
        }
    }

    render (){
        return (
            <div>
                <PostContentTitle title="글 목록" />
                <PostContent
                    title="title"
                    content="content"
                />
            </div>
        )
    }
}


export default List;