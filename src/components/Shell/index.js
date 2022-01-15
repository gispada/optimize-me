import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Container
} from '@mui/material'
import Menu from '@mui/icons-material/MenuRounded'
import { Link } from 'react-router-dom'
import { Footer } from '../Footer'

const drawerStyle = {
  width: ({ drawerWidth }) => drawerWidth,
  '& .MuiDrawer-paper': { width: ({ drawerWidth }) => drawerWidth }
}

export const Shell = ({ title, menu, children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen)

  const renderMenu = ({ isMobile } = {}) => (
    <List>
      {menu.map(({ title, subTitle, icon, path }) => (
        <ListItemButton
          key={path}
          component={Link}
          to={path}
          onClick={isMobile ? toggleMobileDrawer : undefined}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={title} secondary={subTitle} />
        </ListItemButton>
      ))}
    </List>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: ({ zIndex }) => zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleMobileDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex' }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={toggleMobileDrawer}
          sx={{
            display: { xs: 'block', sm: 'none' },
            zIndex: ({ zIndex }) => zIndex.drawer + 2,
            ...drawerStyle
          }}
        >
          {renderMenu({ isMobile: true })}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            ...drawerStyle
          }}
        >
          <Toolbar />
          {renderMenu()}
        </Drawer>

        <Box
          component="main"
          sx={{
            p: 2,
            flex: 1,
            backgroundColor: 'grey.100',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
            {children}
          </Container>
          <Footer />
        </Box>
      </Box>
    </>
  )
}
