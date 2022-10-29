import axios from 'axios';

const api = axios.create({
    baseURL: "https://movie-recommendation-back.herokuapp.com/"
})


export const postNewFollow = async (body) => {
    await api.post(`/follow/new`, body)
}

export const getAllFollows = async () => {
    const resp = await api.get(`/follow/all`)
    return resp.data
}

export const getFollowsById = async (userid, postid) => {
    try {
        const resp = await api.get(`/follow/${userid}/${postid}`)
        return resp.data
    } catch (e) {
        return []
    }
}

export const putFollowsById = async (userid, postid, body) => {
    await api.put(`/follow/edit/${userid}/${postid}`, body)
}

export const deleteFollow = async (userid, postid) => {
    await api.delete(`/follow/delete/${userid}/${postid}`)
}