import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'
import searching from './searching'

const foundPhotos = store({
  searching: false,
  searchResult: null,
  searchDateStart: null,
  searchDateEnd: null,
  searchProgress: 0,
  searchResLoaded: false,

  clearSearching() {
    foundPhotos.searching = false
    foundPhotos.searchResult = null
    foundPhotos.ResLoaded = null
    foundPhotos.searchDateStart = null
    foundPhotos.searchDateEnd = null
    foundPhotos.searchProgress = 0
  },

  clearInterval() {
    if (typeof foundPhotos.interval === 'number') {
      clearInterval(foundPhotos.interval)
    }
  },

  async checkWorkerProgress(request_id) {
    try {
      foundPhotos.searching = true
      const { data } = await get(`/api/search/request/`, {
        request_id,
      })
      foundPhotos.results = null
      foundPhotos.clearInterval()
      foundPhotos.searchProgress = data.progress

      if (data?.progress !== 1) {
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

        console.log("tags", searching.chosenTags)

        if (searching.chosenTags.length) {
          console.log("add tag to request")
          params.tags = searching.chosenTags
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
