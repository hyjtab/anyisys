import request from './request'
import store from '@/store'

export const chart = (id) => {
    return request({
        url: '/my/detail',
        params: {
            id: id
        },
        method: 'GET',
        headers: {
            Authorization: store.getters.token
        }
    })
}
