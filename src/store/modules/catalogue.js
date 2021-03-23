import {store} from '@risingstack/react-easy-state'
import {get, post} from '../api'
import {reqErrHandler} from '../../helpers/reqErrHandler'

const catalogues = store({
  photos: [],
  limit: 25,
  offset: 25,
  loaded: false,
  prevLink: null,
  nextLink: null,
  imageProgress: 0,
  interval: null,

  searching: false,
  searchResult: null,
  searchDateStart: null,
  searchDateEnd: null,

  clearModule() {
    catalogues.photos = []
    catalogues.loaded = false
  },

  clearSearching() {
    catalogues.searching = false
    catalogues.searchResult = null
    catalogues.searchDateStart = null
    catalogues.searchDateEnd = null
  },

  clearInterval() {
    if (typeof catalogues.interval === 'number') {
      clearInterval(catalogues.interval)
    }
  },

  async checkWorkerProgress(request_id) {
    try {
      const { data } = await get(`/api/search/request/`, {
        request_id,
      })
      catalogues.searching = true
      catalogues.results = null
      catalogues.clearInterval()

      if (!data?.progress) {
        catalogues.interval = setInterval(async () => {
          await catalogues.checkWorkerProgress(request_id)
        }, 10000)
      } else {
        const date = {}
        if (catalogues.searchDateStart) {
          date.start_year = new Date(catalogues.searchDateStart).getFullYear()
          date.start_month = new Date(catalogues.searchDateStart).getMonth() + 1
        }
        if (catalogues.searchDateEnd) {
          date.end_year = new Date(catalogues.searchDateEnd).getFullYear()
          date.end_month = new Date(catalogues.searchDateEnd).getMonth() + 1
        }
        const params = {
          request_id,
          ...date
        }
        const { data } = await get('/api/images/', params)
        catalogues.searching = false
        catalogues.searchResult = data
        const sS = JSON.parse(sessionStorage.getItem('results')) || []
        sS.push(data)
        if (sS.length > 10) {
          sS.shift()
        }
        sessionStorage.setItem('results', JSON.stringify(sS))
        catalogues.clearInterval()
      }

      return true
    } catch (e) {
      const err = reqErrHandler(e)
      catalogues.clearInterval()
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

  async getTestImages(page) {
    try {
      const res = await get(`/api/images/`, {  limit: catalogues.limit, offset: catalogues.offset * page })
      catalogues.photos = res.data?.results
      catalogues.prevLink = res.data?.previous
      catalogues.nextLink = res.data?.next
      catalogues.loaded = true
      return res
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('err', err)
    }
  },

  async getCatalogById(id) {
    if (catalogues.photos.length) {
      return catalogues.photos.find((p) => p.pk === +id)
    } else {
      await catalogues.getTestImages();
      return catalogues.photos.find((p) => p.pk === +id) || {}
    }
  },
})

export default catalogues