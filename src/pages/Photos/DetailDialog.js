import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { capitalize } from 'lodash'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material'
import {
  selectActivePhotoId,
  selectActivePhotoUrl,
  selectActivePhotoTitle,
  selectActivePhotoNotes
} from '../../features/gallery/selectors'
import { galleryActions } from '../../features/gallery/reducer'

const NotesEditor = () => {
  const dispatch = useDispatch()
  const notes = useSelector(selectActivePhotoNotes)

  return (
    <>
      <Typography variant="h6">Notes</Typography>
      <TextField
        fullWidth
        placeholder="Add your notes here..."
        multiline
        rows={4}
        value={notes}
        onChange={({ target }) =>
          dispatch(galleryActions.setActivePhotoNotes(target.value))
        }
      />
    </>
  )
}

const DetailDialog = () => {
  const dispatch = useDispatch()

  // The dialog is only connected to properties that do not change
  const id = useSelector(selectActivePhotoId)
  const url = useSelector(selectActivePhotoUrl)
  const title = useSelector(selectActivePhotoTitle)

  const onClose = () => {
    dispatch(galleryActions.commitActivePhoto())
  }

  return (
    <Dialog open={!!id} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ color: 'secondary.main' }}>Photo {id}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <img width="100%" src={url} alt={title} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 0 }}>
              <Typography variant="h6">Description</Typography>
              <Typography gutterBottom>{capitalize(title)}</Typography>
              <NotesEditor />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(DetailDialog)
