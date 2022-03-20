import router from '.'
import store from '@/store'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/login')
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})
