import React, { Component } from 'react';
import { PostContent } from 'components/Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as postActions from 'redux/modules/post';


class List extends Component {

    handlePostList = async () => {

        const { PostActions } = this.props;

        try {
            await PostActions.postlist ();

            const response = this.props.result.toJS();
        } catch (e) {
            console.log("An error occured.");
        }
    }

    render (){
        return (
            <PostContent title="글 목록">
            </PostContent>
        )
    }
}


export default connect (
    (state) => ({

    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
    })
)(List);