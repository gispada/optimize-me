import Home from '@mui/icons-material/HomeRounded'
import Add from '@mui/icons-material/PersonAddRounded'
import PhotoLibrary from '@mui/icons-material/PhotoLibraryRounded'
import HomePage from '../pages/Home'
import Registration from '../pages/Registration'
import Gallery from '../pages/Gallery'
import Photos from '../pages/Photos'

const iconStyle = { color: 'secondary.main' }

export const routes = [
  {
    title: 'Home',
    icon: <Home sx={iconStyle} />,
    path: '/',
    component: HomePage
  },
  {
    title: 'Registration',
    icon: <Add sx={iconStyle} />,
    path: '/registration',
    component: Registration
  },
  {
    title: 'Gallery',
    icon: <PhotoLibrary sx={iconStyle} />,
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
