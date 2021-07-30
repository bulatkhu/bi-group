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

  requestId: '',

  pagination: {
    photos: [],
    limit: 20,
    offset: 0,
    catalogLoaded: false,
    prevLink: null,
    nextLink: null,
    requestsCount: 0,
    process: false,
  },

  clearSearching() {
    foundPhotos.searching = false
    foundPhotos.searchResult = null
    foundPhotos.ResLoaded = null
    foundPhotos.searchDateStart = null
    foundPhotos.searchDateEnd = null
    foundPhotos.searchProgress = 0

    foundPhotos.pagination = {
      photos: [],
      limit: 20,
      offset: 0,
      catalogLoaded: false,
      prevLink: null,
      nextLink: null,
      requestsCount: 0,
      process: false,
      end: false,
    }
  },

  clearInterval() {
    if (typeof foundPhotos.interval === 'number') {
      clearInterval(foundPhotos.interval)
    }
  },

  async getMorePhotos() {
    try {
      foundPhotos.pagination.process = true
      const params = {
        request_id: foundPhotos.requestId,
        limit: foundPhotos.pagination.limit,
      }

      if (foundPhotos.pagination.requestsCount === 0) {
        params.offset = foundPhotos.pagination.offset
      } else {
        foundPhotos.pagination.offset =
          foundPhotos.pagination.offset +
          foundPhotos.pagination.limit
        params.offset = foundPhotos.pagination.offset
      }

      const { data } = await get(`/api/images/`, params)
      foundPhotos.pagination.requestsCount =
        foundPhotos.pagination.requestsCount + 1

      if (!data.results.length) {
        foundPhotos.pagination.end = true
      } else {
        foundPhotos.pagination.photos = [
          ...foundPhotos.pagination.photos,
          ...data.results,
        ]
      }
      foundPhotos.pagination.process = false
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('error', err)
    }
  },

  async checkWorkerProgress(request_id) {
    try {
      foundPhotos.requestId = request_id
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
          date.start_year = new Date(
            foundPhotos.searchDateStart
          ).getFullYear()
          date.start_month =
            new Date(
              foundPhotos.searchDateStart
            ).getMonth() + 1
        }
        if (foundPhotos.searchDateEnd) {
          date.end_year = new Date(
            foundPhotos.searchDateEnd
          ).getFullYear()
          date.end_month =
            new Date(foundPhotos.searchDateEnd).getMonth() +
            1
        }
        const params = {
          request_id,
          ...date,
        }

        console.log('tags', searching.chosenTags)

        if (searching.chosenTags.length) {
          console.log('add tag to request')
          params.tags = searching.chosenTags
        }

        await foundPhotos.getMorePhotos()

        foundPhotos.searching = false
        foundPhotos.searchResLoaded = true
        // foundPhotos.searchResult = data

        const sS =
          JSON.parse(sessionStorage.getItem('results')) ||
          []

        sS.push(data)
        if (sS.length > 10) {
          sS.shift()
        }
        sessionStorage.setItem(
          'results',
          JSON.stringify(sS)
        )
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
