import React, { Component } from 'react';
import { PostContentTitle, PostContent } from 'components/Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as postActions from 'redux/modules/post';


class List extends Component {

    handlePostList = async () => {
        const { PostActions } = this.props;
        
        try {
            await PostActions.postList();
            const response = this.props.result.toJS();
        
            return response;

        } catch (e) {
            console.log("An error occured.");

            return undefined
        }
    }

    render (){
        return (
            <div>
                <PostContentTitle title="글 목록" />
                <PostContent title="text" content="text" />
            </div>
        )
    }
}


export default connect (
    (state) => ({
        result: state.post.get('result')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
    })
)(List);