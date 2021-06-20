import { store } from '@risingstack/react-easy-state';
import { get } from '../api'
import { reqErrHandler } from '../../helpers/reqErrHandler'

const catalogPreview = store({
  search: "2020",
  limit: 20,
  offset: 0,
  loading: false,

  catalog: [null, null],

  async getCatalogPreview() {
    try {
      catalogPreview.loading = true;

      const params = {
        limit: catalogPreview.limit,
        offset: catalogPreview.offset,
      }

      if (catalogPreview.search) {
        params.search = catalogPreview.search
      }

      const { data } = await get('/api/search/lookup/tags/', params)

      catalogPreview.loading = false;
      catalogPreview.catalog = [data, null];
    } catch (e) {
      const err = reqErrHandler(e);

      catalogPreview.loading = false;
      catalogPreview.catalog = [null, err];
    }
  },

});

export default catalogPreview;
