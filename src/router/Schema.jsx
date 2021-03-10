import Auth from '../pages/Auth'
import Photos from '../pages/App/components/Photos'
import PhotoDetail from '../pages/App/components/PhotoDetail'

const Schema = [
  {
    path: '/auth',
    component: Auth,
    private: false,
  },
  {
    path: '/app-catalogues',
    component: Photos,
    private: true,
  },
  {
    path: '/app-catalog/:id',
    component: PhotoDetail,
    private: true,
  },
]

export default Schema