import router from '@/router'
import { api } from '@/functions'

export default {
  async getAuthUser() {
    return api.apiRequest({
      url: '/auth',
      successHandler: (response) => {
        return response.data.data.user
      },
    })
  },
  async login(userData) {
    return api.apiRequest({
      url: '/auth',
      method: 'POST',
      data: userData,
      successHandler: (response) => {
        localStorage.setItem('token', response.data.data.token)
        router.push('/')
      },
    })
  },
  logout() {
    if (localStorage.getItem('token')) this.deleteAuth()
    localStorage.setItem('token', '')
    router.push('/auth')
  },
  deleteAuth() {
    return api.apiRequest({
      url: '/auth',
      method: 'DELETE',
    })
  },
}
