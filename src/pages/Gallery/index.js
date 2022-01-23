import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { batch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { capitalize } from 'lodash'
import {
  isLoading,
  selectFilteredAlbums
} from '../../features/gallery/selectors'
import { galleryActions } from '../../features/gallery/reducer'
import { api } from '../../utils'
import Loader from '../../components/Loader'
import Table from '../../components/Table'
import Filters from './Filters'
import RatingCell from './RatingCell'
import LinkCell from './LinkCell'

const albumColumns = [
  {
    title: 'Album title',
    dataIndex: 'title',
    render: (value, row) => <LinkCell value={value} row={row} />
  },
  {
    title: 'Author',
    dataIndex: 'author'
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    render: (value, row) => <RatingCell value={value} row={row} />
  }
]

const populateAlbums = (albums, users) => {
  const usersById = users.reduce(
    (acc, user) => ({ ...acc, [user.id]: user }),
    {}
  )
  return albums.map(album => ({
    ...album,
    rating: Math.round(Math.random() * 5),
    title: capitalize(album.title),
    author: usersById[album.userId].name
  }))
}

const Gallery = () => {
  const dispatch = useDispatch()
  const loading = useSelector(isLoading)
  const filteredAlbums = useSelector(selectFilteredAlbums)

  useEffect(() => {
    const fetchResources = async () => {
      dispatch(galleryActions.setLoading(true))

      const [albums, users] = await Promise.all([
        api.get('albums'),
        api.get('users')
      ])

      batch(() => {
        dispatch(galleryActions.setAlbums(populateAlbums(albums, users)))
        dispatch(galleryActions.setUsers(users))
        dispatch(galleryActions.setLoading(false))
      })
    }

    fetchResources()

    return () => {
      dispatch(galleryActions.reset())
    }
  }, [dispatch])

  return (
    <Box>
      <Loader visible={loading} />

      <Typography variant="h3" sx={{ mb: 6 }}>
        Browse photos
      </Typography>

      <Filters />

      <Table
        columns={albumColumns}
        data={filteredAlbums}
        alternativeStyle
        emptyMessage="No albums found"
        pagination
      />
    </Box>
  )
}

export default Gallery
