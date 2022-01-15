import { Typography, Box } from '@mui/material'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import { Link } from 'react-router-dom'

const LinkCell = ({ value, row }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        component={Link}
        to={`/gallery/${row.id}`}
        fontSize={14}
        sx={{ textDecoration: 'none', color: 'secondary.light' }}
      >
        {value}
      </Typography>
      <ChevronRightRounded sx={{ color: 'secondary.light' }} />
    </Box>
  )
}

export default LinkCell
