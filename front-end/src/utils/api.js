import axios from 'axios';

const post = async (route, data) => axios.post(`http://localhost:3001/${route}`, data);

const d = '';

export { post, d };
