import axios from 'axios';


let host = 'http://116.62.179.163:8000';


export const register = parmas => {
    return axios.post(`${host}/users/`, parmas)
};


export const login = params => {
    return axios.post(`${host}/login/`, params)
}

export const pmsg = params => {
    return axios.post(`${host}/pmsg/`, params)
}

export const getUserInfo = params => {
    return axios.get(`${host}/users/${params.id}/`, params)
}
export const updateUserInfo = params => {
    return axios.put(`${host}/users/${params.id}/`, params)
}

export const contentsList = params => {
    return axios.get(`${host}/contents/`, params)
}