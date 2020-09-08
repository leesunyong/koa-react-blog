import React, { Component } from 'react';
import { PageTitle, PostContent } from 'components/Post';
import { postList } from 'lib/api/post'


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
            console.log(list);

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
                <PageTitle
                    title="글 목록"
                    to="/post/write"
                    button="글 쓰기"
                />
                {this.state.list.map((value, index) => {
                    return (
                        <PostContent
                            key={index}
                            title={value.title}
                            content={value.content}
                            id={value._id}
                            onClick={this.handlePostList}
                        />
                    )
                })}
            </div>
        )
    }
}


export default List;