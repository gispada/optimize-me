import { Typography, Box } from '@mui/material'
import Error from '@mui/icons-material/ErrorRounded'

const NotFound = () => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Error fontSize="large" color="error" />
      <Typography variant="h4" color="error" sx={{ ml: 1 }}>
        404
      </Typography>
    </Box>
    <Typography variant="h2">Page not found</Typography>
  </Box>
)

export default NotFound
