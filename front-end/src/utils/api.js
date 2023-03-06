import axios from 'axios';

const post = async (route, data) => axios.post(`http://localhost:3001/${route}`, data);

const get = async (route, data) => axios.post(`http://localhost:3001/${route}`, data);

const d = '';

export { post, get, d };
