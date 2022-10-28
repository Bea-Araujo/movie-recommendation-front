import axios from 'axios';

const api = axios.create({
    baseURL: "https://movie-recommendation-back.herokuapp.com/",
})

export const getUsers = async () => {
    const resp = await api.get('/user/all')
    console.log(resp.data)
    return resp.data;
}