import axios from '@/utils/axios'

export default {
  async apiRequest(config) {
    const {
      url,
      method = 'GET',
      data = null,
      params = null,
      successHandler = (response) => response?.data?.data,
      errorHandler = (error) => error.response?.data?.message,
    } = config

    try {
      const response = await axios({
        url,
        method,
        data,
        params,
      })

      return successHandler(response)
    } catch (error) {
      console.error('Ошибка: ', error.response?.data?.message)
      return errorHandler(error)
    }
  },
}
