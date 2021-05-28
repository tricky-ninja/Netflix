const API_KEY = process.env.API_KEY
import {baseUrl} from './config/config'

const instance = axios.create({
    baseURL: baseUrl
});

export default instance