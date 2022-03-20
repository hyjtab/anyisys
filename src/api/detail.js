import request from './request'
import store from '@/store'

export const detail = () => {
    return request({
        url: '/my/hospitallist',
        method: 'GET',
        headers: {
            Authorization: store.getters.token
        }
    })
}
