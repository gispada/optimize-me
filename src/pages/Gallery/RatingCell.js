import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { Rating } from '@mui/material'
import { galleryActions } from '../../features/gallery/reducer'

const RatingCell = ({ value = 0, row }) => {
  const dispatch = useDispatch()

  return (
    <Rating
      value={value}
      onChange={(_, value) =>
        dispatch(galleryActions.setAlbumRating({ id: row.id, value }))
      }
    />
  )
}

export default memo(RatingCell)
