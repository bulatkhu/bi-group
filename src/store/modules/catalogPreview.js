import { store } from '@risingstack/react-easy-state'
import { get } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'

const catalogPreview = store({
  search: '2020',
  limit: 20,
  offset: 0,
  loading: false,

  catalog: [[], null],

  async getCatalogPreview() {
    try {
      catalogPreview.loading = true

      const params = {
        limit: catalogPreview.limit,
        offset: catalogPreview.offset,
      }

      if (catalogPreview.search) {
        params.search = catalogPreview.search
      }

      const {
        data: { results },
      } = await get('/api/images/tags/groups/', params)

      catalogPreview.loading = false
      catalogPreview.catalog = [results, null]
    } catch (e) {
      const err = reqErrHandler(e)
      catalogPreview.loading = false
      catalogPreview.catalog = [[], err]
    }
  },
})

export default catalogPreview
