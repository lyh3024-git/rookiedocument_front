import axios from 'axios';


let host = 'http://127.0.0.1:8000';


export const register = parmas => {
    return axios.post(`${host}/users/`, parmas)
};


export const login = params => {
    return axios.post(`${host}/login/`, params)
}
