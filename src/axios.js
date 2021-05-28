import axios from 'axios'
import {baseUrl} from './config/config'

const instance = axios.create({
    baseURL: baseUrl
});

export default instance