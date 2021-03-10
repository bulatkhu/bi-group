import { store } from '@risingstack/react-easy-state'
import { fakeApi } from '../api'

const mokePhotos = [
  { img: "/images/mokes/house-photo1.jpg", title: "House 1", id: 1, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 2", id: 2, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 3", id: 3, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 4", id: 4, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 5", id: 5, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 5", id: 5, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 6", id: 6, date: new Date() },
  { img: "/images/mokes/house-photo1.jpg", title: "House 7", id: 7, date: new Date() },
]

const catalogues = store({
  photos: [],
  loaded: false,

  async getCatalogById(id) {
    if (catalogues.photos.length) {
      return catalogues.photos.find((p) => p.id === +id)
    } else {
      await this.fetchCatalog();
      return catalogues.photos.find((p) => p.id === +id) || {}
    }
  },

  async fetchCatalog() {
    await fakeApi(500)
    catalogues.photos = mokePhotos
    catalogues.loaded = true
    return mokePhotos
  }
})

export default catalogues