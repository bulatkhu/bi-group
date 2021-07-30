import { store } from '@risingstack/react-easy-state'
import { get, post } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'
import foundPhotos from './foundPhotos'

const searching = store({
  result: { tags: [], profiles: [] },
  loading: false,
  chosenAvatar: null,
  chosenTags: [],

  clearModule() {
    searching.result = { tags: [], profiles: [] }
    searching.loading = false
    searching.chosenAvatar = null
    searching.chosenTags = []
  },

  addSearchTag(tag) {
    if (searching.chosenTags.includes(tag)) {
      searching.chosenTags = [
        ...searching.chosenTags.filter(
          (chosenTag) => chosenTag !== tag
        ),
      ]
    } else {
      searching.chosenTags = [...searching.chosenTags, tag]
    }
    searching.chosenTags = [...searching.chosenTags]
  },

  async searchByValue(value) {
    try {
      searching.chosenTags = []
      searching.loading = true
      const results = await Promise.all([
        get(`/api/search/lookup/tags/`, {
          search: value,
          limit: 200,
          offset: 0,
        }),
        get(`/api/search/lookup/profiles/`, {
          search: value,
          limit: 200,
          offset: 0,
        }),
      ])
      searching.result = {
        tags: results[0]?.data?.results,
        profiles: results[1]?.data?.results,
      }
      searching.loading = false
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('err', err)
    }
  },

  async searchByImgUrl(url) {
    try {
      const {
        data: { request_id },
      } = await post(`/api/search/request/`, {
        image_url: url,
      })
      foundPhotos.checkWorkerProgress(request_id)
      return {
        message: request_id,
        error: false,
      }
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('err', err)
      return {
        message: err,
        error: true,
      }
    }
  },
})

export default searching
