import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import catalogue from './catalogue'
import { reqErrHandler } from '../../helpers/reqErrHandler'

const clientId = 'f4592ec7-5bbc-4121-a188-3fefa8c3961f'
const resource = 'https://test-api-media.bi.group'

const auth = store({
  user: {},
  loaded: false,
  isAuth: false,

  refreshInterval: null,

  clearModule() {
    auth.user = {}
    auth.loaded = true
    auth.isAuth = false
    auth.refreshInterval = null
  },

  async auth() {
    const token =
      sessionStorage.getItem('accessToken') &&
      sessionStorage.getItem('refreshToken')
    if (token) {
      auth.isAuth = true
      await this.fetchUser()
    } else {
      auth.isAuth = false
      auth.loaded = true
    }
  },

  updateRefreshToken() {
    clearInterval(auth.refreshInterval)
    const { expireDate } =
      JSON.parse(
        sessionStorage.getItem('accessTokenExpire')
      ) || {}
    const distance = expireDate - Date.now()

    if (distance > 0) {
      auth.refreshInterval = setInterval(
        auth.refreshToken,
        distance - 5000
      )
    }
    // auth.refreshInterval = setInterval(auth.refreshToken, 5000);
  },

  async refreshToken() {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('resource', resource)
    params.append('client_id', clientId)
    params.append(
      'refresh_token',
      sessionStorage.getItem('refreshToken')
    )
    try {
      const res = await post(`/access`, params)
      const { access_token, expires_in } = res.data
      sessionStorage.setItem('accessToken', access_token)
      sessionStorage.setItem(
        'accessTokenExpire',
        JSON.stringify({
          ms: expires_in * 1000,
          expireDate: Date.now() + expires_in * 1000,
        })
      )
      auth.loaded = true
      auth.isAuth = true
      auth.updateRefreshToken()
      return true
    } catch (e) {
      clearInterval(auth.refreshInterval)
      const err = reqErrHandler(e)
      console.log('error on token refresh', err)
      return reqErrHandler(err)
    }
  },

  async login(payload) {
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('resource', resource)
    params.append('client_id', clientId)
    params.append('username', payload?.username)
    params.append('password', payload?.password)
    try {
      const res = await post(`/access`, params)
      const {
        access_token,
        refresh_token,
        expires_in,
        refresh_token_expires_in,
      } = res.data
      sessionStorage.setItem('accessToken', access_token)
      sessionStorage.setItem('refreshToken', refresh_token)
      sessionStorage.setItem(
        'accessTokenExpire',
        JSON.stringify({
          ms: expires_in * 1000,
          expireDate: Date.now() + expires_in * 1000,
        })
      )
      sessionStorage.setItem(
        'refreshTokenExpire',
        JSON.stringify({
          ms: refresh_token_expires_in * 1000,
          expireDate:
            Date.now() + refresh_token_expires_in * 1000,
        })
      )
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
    sessionStorage.removeItem('accessTokenExpireDate')
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
  },
})

export default auth
