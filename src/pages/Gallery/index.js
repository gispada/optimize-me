import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { batch } from 'react-redux'
import {
  isLoading,
  selectAlbums,
  selectFilters,
  selectUsers
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

const addRating = items =>
  items.map(item => ({ ...item, rating: Math.round(Math.random() * 5) }))

const Gallery = () => {
  const dispatch = useDispatch()
  const loading = useSelector(isLoading)
  const albums = useSelector(selectAlbums)
  const users = useSelector(selectUsers)
  const filters = useSelector(selectFilters)

  useEffect(() => {
    const fetchResources = async () => {
      dispatch(galleryActions.setLoading(true))

      const [albums, users] = await Promise.all([
        api.get('albums'),
        api.get('users')
      ])

      batch(() => {
        dispatch(galleryActions.setAlbums(addRating(albums)))
        dispatch(galleryActions.setUsers(users))
        dispatch(galleryActions.setLoading(false))
      })
    }

    fetchResources()

    return () => {
      dispatch(galleryActions.reset())
    }
  }, [dispatch])

  const tableData = albums.filter(album =>
    Object.entries(filters).every(([filter, value]) => album[filter] === value)
  )

  return (
    <Box>
      <Loader visible={loading} />

      <Typography variant="h3" sx={{ mb: 6 }}>
        Browse photos
      </Typography>

      <Filters users={users} filters={filters} />

      <Table
        columns={albumColumns}
        data={tableData}
        alternativeStyle
        emptyMessage="No albums found"
      />
    </Box>
  )
}

export default Gallery
