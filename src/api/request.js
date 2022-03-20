import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000
})

service.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
},
    (error) => {
        return Promise.reject(new Error(error))
    }
)

service.interceptors.response.use(
    (response) => {
        const { data, meta } = response.data
        if (!meta.status) {
            return data
        } else {
            ElMessage.error(meta.message)
            return Promise.reject(new Error(meta.message)).catch((e) => { })
        }
    },
    error => {
        error.response && ElMessage.error(error.response.data)
        return Promise.reject(new Error(error.response.data))
    })
export default service
