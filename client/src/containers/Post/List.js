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

        this.handlePostList = this.handlePostList.bind(this);
    }

    handlePostList = async () => {
        try {
            const result = await postList();
            const list = JSON.parse(result.request.response);
            this.setState({list});

        } catch (e) {
            console.log("An error occured.");
        }
    }

    componentDidMount() {
        this.handlePostList();
    }

    render (){
        return (
            <div>
                <PostContentTitle title="글 목록" />
                <PostContent
                    title="title"
                    content="content"
                />

                {this.state.list.map((value, index) => {
                    return <PostContent title={value.title} content={value.content}/>
                })}
            </div>
        )
    }
}


export default List;