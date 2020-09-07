import axios from 'axios';


export const postList = () => axios.get('/api/post/list');