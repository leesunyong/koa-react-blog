import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as PostAPI from 'lib/api/post';


import { Map } from 'immutable';


const POST_LIST = 'post/POST_LIST';


export const postList = createAction(POST_LIST, PostAPI.postList);


const initialState = Map({
    result: Map({}),
});


export default handleActions({
    ...pender({
        type: POST_LIST,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
}, initialState);