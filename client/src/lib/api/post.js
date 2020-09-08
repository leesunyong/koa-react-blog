import axios from 'axios';


export const postList = () => axios.get('/api/post/list');

export const writePost = ({writer, title, content}) =>
    axios.post('/api/post/write', { writer, title, content});