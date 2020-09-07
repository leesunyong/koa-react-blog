import React, { Component } from 'react';
import { MyEditor, Button, InputWithLabel, LinkButton } from 'components/Post';


class Write extends Component {
    render () {
        return (
            <div>
                글 쓰기
                <InputWithLabel label="제목" />
                <MyEditor />
                <div>
                    <Button onClick={null}>
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