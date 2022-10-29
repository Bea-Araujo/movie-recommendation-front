import axios from 'axios';

const api = axios.create({
    baseURL: "https://movie-recommendation-back.herokuapp.com/",
})

export const getAllPosts = async () => {
    const resp = await api.get('/post/all')
    // console.log(resp.data)
    return resp.data;
}

export const postNewPost = async (body) => {
    await api.post(`/post/new`, body)
}

export const putPost = async (id, body) => {
    await api.put(`/post/edit/${id}`, body)
}

export const deletePost = async (id) => {
    await api.delete(`/post/delete/${id}`)
}


