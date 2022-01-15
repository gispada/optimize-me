import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box>
      <Typography fontSize="large" paragraph>
        This application is <strong>intentionally</strong> coded in a way that
        ignores React best practices on optimization.
      </Typography>
      <Typography fontSize="large" paragraph>
        As a result, the three main sections &#8212; Registration, Gallery and
        Albums' photos &#8212; feel slow when interacting with them, with
        noticeable FPS drops especially when typing.
      </Typography>
    </Box>
  )
}

export default Home
