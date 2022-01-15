import { createTheme } from '@mui/material/styles'

export default createTheme({
  drawerWidth: 240,
  palette: {
    primary: {
      light: '#fb9274',
      main: '#f96e46',
      dark: '#f85325',
      contrastText: '#fff'
    },
    secondary: {
      light: '#26407d',
      main: '#192a51',
      dark: '#13203e',
      contrastText: '#000'
    },
    background: { main: '#e9e9ed' }
  }
})
