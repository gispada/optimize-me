import { Typography } from '@mui/material'

export const Footer = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {`Copyright © ${new Date().getFullYear()} Optimize me. All rights reserved.`}
  </Typography>
)
