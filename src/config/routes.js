import Home from '@mui/icons-material/HomeRounded'
import Add from '@mui/icons-material/PersonAddRounded'
import PhotoLibrary from '@mui/icons-material/PhotoLibraryRounded'
import HomePage from '../pages/Home'
import Registration from '../pages/Registration'
import Gallery from '../pages/Gallery'
import Photos from '../pages/Photos'

export const routes = [
  {
    title: 'Home',
    icon: <Home />,
    path: '/',
    component: HomePage
  },
  {
    title: 'Registration',
    icon: <Add />,
    path: '/registration',
    component: Registration
  },
  {
    title: 'Gallery',
    icon: <PhotoLibrary />,
    path: '/gallery',
    component: Gallery,
    routes: [
      {
        title: 'Photos',
        path: ':albumId',
        component: Photos
      }
    ]
  }
]
