import { useCallback, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import { api } from '../../utils'
import { galleryActions } from '../../features/gallery/reducer'
import {
  isLoading,
  selectAlbums,
  selectPhotos
} from '../../features/gallery/selectors'
import Loader from '../../components/Loader'
import Image from './Image'
import DetailDialog from './DetailDialog'

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

  useEffect(() => {
    const fetchResources = async () => {
      dispatch(galleryActions.setLoading(true))

      const [album, photos] = await Promise.all([
        api.get(`albums?id=${albumId}`),
        api.get(`photos?albumId=${albumId}`)
      ])

      batch(() => {
        dispatch(galleryActions.setAlbums(album))
        dispatch(galleryActions.setPhotos(photos.map(changeImageSource)))
        dispatch(galleryActions.setLoading(false))
      })
    }

    fetchResources()

    return () => {
      dispatch(galleryActions.reset())
    }
  }, [dispatch, albumId])

  const setActivePhoto = useCallback(
    id => {
      dispatch(galleryActions.setActivePhoto(id))
    },
    [dispatch]
  )

  return (
    <>
      <Box>
        <Loader visible={loading} />
        <Typography variant="h3" sx={{ mb: 6 }}>
          {album?.title}
        </Typography>

        <Grid container spacing={2}>
          {photos.map(({ url, id, title }) => (
            <Grid key={id} item xs={12} md={4} lg={3} justifyContent="center">
              <Image id={id} url={url} title={title} onClick={setActivePhoto} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <DetailDialog />
    </>
  )
}

export default Photos
