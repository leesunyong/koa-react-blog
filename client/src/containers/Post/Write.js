import React, { Component } from 'react';
import { PostEditor, Button, InputWithLabel, LinkButton } from 'components/Post';


class Write extends Component {

    constructor(props) {
        super(props);
        this.state = { title : '', content : ''};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    writeHandle = async () => {
        const { title } = this.state.form;

        console.log( title );
    }

    handleTitleChange (event) {
        this.setState({ title : event.target.value });
    }

    handleContentChange (text) {
        this.setState( { content : text });
    }


    render () {

        return (
            <div>
                글 쓰기
                <InputWithLabel
                    label="제목"
                    name="title"
                    onChange={this.handleTitleChange}
                />
                <PostEditor onChange={this.handleContentChange}/>
                <div>
                    <Button onClick={this.writeHandle}>
                        글 작성
                    </Button>
                    <LinkButton to="/post/list">
                        취소
                    </LinkButton>
                </div>
            </div>
        );
    }
}


export default Write;