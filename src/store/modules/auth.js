import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import catalogue from './catalogue'
import { reqErrHandler } from '../../helpers/reqErrHandler'

const auth = store({
  user: {},
  loaded: false,
  isAuth: false,

  clearModule() {
    auth.user = {}
    auth.loaded = true
    auth.isAuth = false
  },

  async auth() {
    const token = sessionStorage.getItem('accessToken') &&
      sessionStorage.getItem('refreshToken')
    if (token) {
      auth.isAuth = true
      await this.fetchUser();
    } else {
      auth.isAuth = false
      auth.loaded = true
    }
  },

  async login(payload) {
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('resource', 'https://test-api-media.bi.group')
    params.append('client_id', 'f4592ec7-5bbc-4121-a188-3fefa8c3961f')
    params.append('username', payload?.username)
    params.append('password', payload?.password)
    try {
      const res = await post(`/access`, params)
      const { access_token, refresh_token } = res.data
      sessionStorage.setItem('accessToken', access_token)
      sessionStorage.setItem('refreshToken', refresh_token)
      auth.loaded = true
      auth.isAuth = true
      return true
    } catch (e) {
      return reqErrHandler(e)
    }
  },

  logout() {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    auth.clearModule()
    catalogue.clearModule()
  },

  async fetchUser() {
    try {
      const res = await get(`/api/profiles/user/`)
      auth.user = res.data
      auth.loaded = true
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('err', err)
      auth.logout()
    }
  }
})

export default auth