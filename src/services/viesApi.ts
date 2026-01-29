import axios from 'axios'

export const viesApi = axios.create({
  baseURL: import.meta.env.VIES_API_URL,
})
