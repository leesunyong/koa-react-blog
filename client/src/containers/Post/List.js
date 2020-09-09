import React, { Component } from 'react';
import { PageTitle, PostContent } from 'components/Post';
import { postList } from 'lib/api/post'
import styled from 'styled-components';


const Wrapper = styled.div`
    padding: 30px 0 30px 0;
`;

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {itemNum: 0, list: []};

        this.handlePostList = this.handlePostList.bind(this);
        this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    handlePostList = async () => {
        try {
            let itemNum = this.state.itemNum;
            const result = await postList({ itemNum });
            let list = JSON.parse(result.request.response);
            
            list = this.state.list.concat(list);

            itemNum = this.state.itemNum + list.length;
            this.setState({itemNum, list});

        } catch (e) {
            console.log("An error occured.");
        }
    }

    componentDidMount() {
        this.handlePostList();
        window.addEventListener('scroll', this.infiniteScroll, true);
    }

    infiniteScroll() {

        const documentElement = document.documentElement;
        const body = document.body;

        const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
        const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
        const clientHeight = documentElement.clientHeight;

        if (scrollHeight === scrollTop + clientHeight) {
            this.handlePostList();
        }
    }

    render (){
        return (
            <Wrapper>
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
            </Wrapper>
        )
    }
}


export default List;