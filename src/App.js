import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './config/routes'
import { Shell } from './components/Shell'
import NotFound from './pages/NotFound'

const renderRoute = ({ path, routes, component: RouteComponent }) => {
  if (routes) {
    return (
      <Route key={path} path={path}>
        {routes.map(renderRoute)}
        <Route index element={<RouteComponent />} />
      </Route>
    )
  }
  return <Route key={path} path={path} element={<RouteComponent />} />
}

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Shell title="Optimize me" menu={routes}>
        <Routes>
          {routes.map(renderRoute)}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
