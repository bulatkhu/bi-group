import Auth from '../pages/Auth'
import Photos from '../pages/App/components/Photos'
import PhotoDetail from '../pages/App/components/PhotoDetail'
import FoundPhotos from '../pages/App/components/FoundPhotos'

const Schema = [
  {
    path: '/app-found/:request_id?',
    component: FoundPhotos,
    private: true,
    state: {
      found: true,
    },
  },
  {
    path: '/app-catalogues/:page?',
    component: Photos,
    private: true,
    state: {
      found: false,
    },
  },
  {
    path: '/app-catalog/:id',
    component: PhotoDetail,
    private: true,
  },
  {
    path: '/',
    component: Auth,
    private: false,
  },

  {
    path: '/auth',
    component: Auth,
    private: false,
  },
]

export default Schema