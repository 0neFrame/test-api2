import { api } from '@/functions'

export default {
  async getUsers() {
    return api.apiRequest({
      url: '/users',
      errorHandler: () => {
        return []
      },
    })
  },
  async createUser(userData) {
    return api.apiRequest({
      url: '/users',
      method: 'POST',
      data: userData,
      successHandler: () => {
        return ''
      },
    })
  },
  async getUserById(id) {
    return api.apiRequest({ url: `/users/${id}` })
  },
  updateUserById(userData) {
    return api.apiRequest({
      url: `/users/${userData.user_id}`,
      method: 'POST',
      data: userData,
    })
  },
  deleteUserById(id) {
    return api.apiRequest({
      url: `/users/${id}`,
      method: 'DELETE',
    })
  },
}
