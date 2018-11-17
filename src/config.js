import axios from 'axios';


export var URL = 'http://localhost:3001/api/v1';
export var createInstance = () => axios.create({
    baseURL: URL,
    headers: {Authorization: 'bearer ' + sessionStorage.getItem('UMPIRE_TOKEN') }
});