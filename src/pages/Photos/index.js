import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { capitalize } from 'lodash'
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { api } from '../../utils'
import { galleryActions } from '../../features/gallery/reducer'
import {
  isLoading,
  selectActivePhoto,
  selectAlbums,
  selectPhotos
} from '../../features/gallery/selectors'
import Loader from '../../components/Loader'
import Image from './Image'

const changeImageSource = (item, i) => ({
  ...item,
  url: `https://source.unsplash.com/random/${i}`
})

const Photos = () => {
  const { albumId } = useParams()
  const dispatch = useDispatch()

  const loading = useSelector(isLoading)
  const photos = useSelector(selectPhotos)
  const [album] = useSelector(selectAlbums)
  const activePhoto = useSelector(selectActivePhoto)

  useEffect(() => {
    const fetchResources = async () => {
      dispatch(galleryActions.setLoading(true))
      const album = await api.get(`albums?id=${albumId}`)
      dispatch(galleryActions.setAlbums(album))
      const photos = await api.get(`photos?albumId=${albumId}`)
      dispatch(galleryActions.setPhotos(photos.map(changeImageSource)))
      dispatch(galleryActions.setLoading(false))
    }

    fetchResources()

    return () => {
      dispatch(galleryActions.reset())
    }
  }, [dispatch, albumId])

  const {
    title,
    url,
    notes = ''
  } = photos.find(({ id }) => id === activePhoto) || {}

  return (
    <>
      <Box>
        <Loader visible={loading} />
        <Typography variant="h3" sx={{ mb: 6 }}>
          {album?.title}
        </Typography>

        <Grid container spacing={2}>
          {photos.map(({ id, url, title }, i) => (
            <Grid
              key={`${url}_${i}`}
              item
              xs={12}
              md={4}
              lg={3}
              justifyContent="center"
            >
              <Image
                id={id}
                url={url}
                title={title}
                onClick={() => dispatch(galleryActions.setActivePhoto(id))}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={!!activePhoto}
        onClose={() => dispatch(galleryActions.setActivePhoto(null))}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ color: 'secondary.main' }}>
          Photo {activePhoto}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <img width="100%" src={url} alt={title} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 0 }}>
                <Typography variant="h6">Description</Typography>
                <Typography gutterBottom>{capitalize(title)}</Typography>
                <Typography variant="h6">Notes</Typography>
                <TextField
                  fullWidth
                  placeholder="Add your notes here..."
                  multiline
                  rows={4}
                  value={notes}
                  onChange={({ target }) =>
                    dispatch(
                      galleryActions.setPhotoNotes({
                        id: activePhoto,
                        value: target.value
                      })
                    )
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(galleryActions.setActivePhoto(null))}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Photos
