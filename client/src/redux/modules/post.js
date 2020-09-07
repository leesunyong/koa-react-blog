import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

const POST_LIST = 'post/POST_LIST';

export const postList = createAction(POST_LIST);

export default handleActions({
    ...pender({
        type: POST_LIST,
    })
});