import { CssBaseline } from '@mui/material'
import Home from '@mui/icons-material/HomeRounded'
import GridView from '@mui/icons-material/GridViewRounded'
import AccountCircle from '@mui/icons-material/AccountCircleRounded'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Shell } from './components/Shell'
import HomePage from './pages/Home'
import NotFound from './pages/NotFound'

const routes = [
  {
    title: 'Home',
    icon: <Home />,
    path: '/',
    component: HomePage
  },
  {
    title: 'Grid',
    icon: <GridView />,
    path: '/grid',
    component: () => <p>Grid</p>
  },
  {
    title: 'Account',
    icon: <AccountCircle />,
    path: '/account',
    component: () => <p>Account</p>
  }
]

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Shell title="Optimize" menu={routes}>
        <Routes>
          {routes.map(({ path, component: RouteComponent }) => (
            <Route key={path} path={path} element={<RouteComponent />} />
          ))}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
