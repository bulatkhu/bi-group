import { store } from '@risingstack/react-easy-state'
import { fakeApi } from '../api'
import catalogue from './catalogue'

const mokeUser = {
  name: 'Bulat',
  avatar: "/images/header/avatar.jpg",
}

const auth = store({
  user: {},
  loaded: false,
  isAuth: false,

  clearModule() {
    auth.user = {}
    auth.loaded = false
    auth.isAuth = false
  },

  async auth() {
    const token = sessionStorage.getItem('token')
    if (token) {
      auth.isAuth = true
      await this.fetchUser();
    }
  },

  logout() {
    sessionStorage.removeItem('token')
    this.clearModule()
    catalogue.clearModule()
  },

  async fetchUser() {
    await fakeApi(500)
    auth.user = mokeUser
    auth.loaded = true
  }
})

export default auth