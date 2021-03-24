import { store } from '@risingstack/react-easy-state'
import {get, post} from '../api'
import {reqErrHandler} from '../../helpers/reqErrHandler'

const foundPhotos = store({
  searching: false,
  searchResult: null,
  searchDateStart: null,
  searchDateEnd: null,
  searchResLoaded: false,

  clearSearching() {
    foundPhotos.searching = false
    foundPhotos.searchResult = null
    foundPhotos.ResLoaded = null
    foundPhotos.searchDateStart = null
    foundPhotos.searchDateEnd = null
  },

  clearInterval() {
    if (typeof foundPhotos.interval === 'number') {
      clearInterval(foundPhotos.interval)
    }
  },

  async checkWorkerProgress(request_id) {
    try {
      const { data } = await get(`/api/search/request/`, {
        request_id,
      })
      foundPhotos.searching = true
      foundPhotos.results = null
      foundPhotos.clearInterval()

      if (!data?.progress) {
        foundPhotos.interval = setInterval(async () => {
          await foundPhotos.checkWorkerProgress(request_id)
        }, 10000)
      } else {
        const date = {}
        if (foundPhotos.searchDateStart) {
          date.start_year = new Date(foundPhotos.searchDateStart).getFullYear()
          date.start_month = new Date(foundPhotos.searchDateStart).getMonth() + 1
        }
        if (foundPhotos.searchDateEnd) {
          date.end_year = new Date(foundPhotos.searchDateEnd).getFullYear()
          date.end_month = new Date(foundPhotos.searchDateEnd).getMonth() + 1
        }
        const params = {
          request_id,
          ...date
        }
        const { data } = await get('/api/images/', params)
        foundPhotos.searching = false
        foundPhotos.searchResult = data
        foundPhotos.searchResLoaded = true
        const sS = JSON.parse(sessionStorage.getItem('results')) || []
        sS.push(data)
        if (sS.length > 10) {
          sS.shift()
        }
        sessionStorage.setItem('results', JSON.stringify(sS))
        foundPhotos.clearInterval()
      }

      return true
    } catch (e) {
      const err = reqErrHandler(e)
      foundPhotos.clearInterval()
      return err
    }
  },

  searchImageByUrl(url) {
    return post(`/api/search/request/`, {
      image_url: url,
    })
  },

  findByImage(formData) {
    return post('/api/search/upload/', formData)
  },
})

export default foundPhotos