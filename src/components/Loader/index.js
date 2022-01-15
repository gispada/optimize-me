import { Backdrop, CircularProgress } from '@mui/material'

const Loader = ({ visible }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
    open={visible}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
)

export default Loader
