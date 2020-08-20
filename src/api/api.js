import axios from 'axios';


let host = 'http://116.62.179.163:8000';


export const register = parmas => {
    return axios.post(`${host}/user/`, parmas)
};


export const login = params => {
    return axios.post(`${host}/login/`, params)
}

export const pmsg = params => {
    return axios.post(`${host}/pmsg/`, params)
}

export const getUserInfo = params => {
    return axios.get(`${host}/user/${params.id}/`, params)
}
export const updateUserInfo = params => {
    return axios.put(`${host}/user/${params.id}/`, params)
}
export const partial_updateUserInfo = params => {
    return axios.patch(`${host}/user/${params.id}/`, params)
}

export const contentsList = params => {
    return axios.get(`${host}/content/`, params)
}

export const getContent = params => {
    return axios.get(`${host}/content/${params.id}/`, params)
}

export const createContent = params => {
    return axios.post(`${host}/content/`, params)
}

export const updateContent = params => {
    return axios.put(`${host}/content/${params.id}/`, params)
}

export const partial_updateContent = params => {
    return axios.patch(`${host}/content/${params.id}/`, params)
}

export const deleteContent = params => {
    return axios.delete(`${host}/content/${params.id}/`, params)
}


export const createTeam = params => {
    return axios.post(`${host}/team/`, params)
}
export const getTeamInfo = params => {
    return axios.get(`${host}/team/${params.id}/`, params)
}

export const deleteTeam = params => {
    return axios.delete(`${host}/team/${params.id}/`, params)
}

export const createTeamMember = params => {
    return axios.post(`${host}/teammember/`, params)
}
export const partial_updateTeamMember = params => {
    return axios.patch(`${host}/teammember/${params.id}/`, params)
}
export const deleteTeamMember = params => {
    return axios.delete(`${host}/teammember/${params.id}/`, params)
}

export const createFavourite = params => {
    return axios.post(`${host}/favourite/`, params)
}

export const deleteFavourite = params => {
    return axios.delete(`${host}/favourite/${params.id}/`, params)
}

export const teamList = params => {
    return axios.get(`${host}/user/${params.id}`, {})
}

export const getTeamId = params => {
    return axios.get(`${host}/team/${params.id}/`, params)
}

export const createComment = params => {
    return axios.post(`${host}/comment/`, params)
}