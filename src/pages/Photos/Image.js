import { memo } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
  IconButton
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'
import { capitalize } from 'lodash'

const Image = ({ title, id, url, onClick }) => {
  return (
    <Card>
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia component="img" height="240" image={url} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Photo {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {capitalize(title)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default memo(Image)
