import { store } from '@risingstack/react-easy-state'
import { get } from '../api'
import {reqErrHandler} from '../../helpers/reqErrHandler'

const searching = store({
  result: { tags: [], profiles: [] },

  clearModule() {
    searching.result = { tags: [], profiles: [] }
  },

  async searchByValue(value) {
    try {
      const results = await Promise.all([
        get(`/api/search/lookup/tags/`, { search: value, limit: 20, offset: 0 }),
        get(`/api/search/lookup/profiles/`, { search: value, limit: 20, offset: 0 })
      ])
      searching.result = { tags: results[0]?.data?.results, profiles: results[1]?.data?.results }
    } catch (e) {
      const err = reqErrHandler(e)
      console.log('err', err)
    }
  },

})

export default searching