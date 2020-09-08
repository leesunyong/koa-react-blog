import axios from 'axios';


export const postList = () => axios.get('/api/post/list');

export const getPost = ({id}) => axios.get('/api/post/get/'+id);

export const writePost = ({writer, title, content}) =>
    axios.post('/api/post/write', { writer, title, content});

export const deletePost = ({id}) => axios.delete('/api/post/delete/'+id);