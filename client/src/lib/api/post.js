import axios from 'axios';


export const postList = ({itemNum}) => axios.get('/api/post/list/' + itemNum);

export const getPost = ({_id}) => axios.get('/api/post/get/'+_id);

export const writePost = ({writer, title, content}) =>
    axios.post('/api/post/write', { writer, title, content});

export const deletePost = ({_id}) => axios.delete('/api/post/delete/'+_id);

export const updatePost = ({ _id, title, content }) =>
    axios.patch('/api/post/update', { _id, title, content });