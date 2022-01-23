import { createSelector } from 'reselect'
import { prop } from '../../utils'

const selectState = prop('gallery')

export const isLoading = createSelector(selectState, prop('loading'))

export const selectUsers = createSelector(selectState, prop('users'))

export const selectFilters = createSelector(selectState, prop('filters'))

export const selectAlbums = createSelector(selectState, prop('albums'))

export const selectFilteredAlbums = createSelector(
  selectAlbums,
  selectFilters,
  (albums, filters) => {
    const filterEntries = Object.entries(filters)
    if (filterEntries.length === 0) return albums
    return albums.filter(album =>
      filterEntries.every(([filterName, value]) => album[filterName] === value)
    )
  }
)

export const selectPhotos = createSelector(selectState, prop('photos'))

export const selectActivePhoto = createSelector(
  selectState,
  prop('activePhoto')
)

// This might be overkill, but serves as an example to only render the smallest portion of UI
// when editing the active photo's notes (see pages/Photos/DetailDialog.js)
export const selectActivePhotoId = createSelector(selectActivePhoto, prop('id'))

export const selectActivePhotoUrl = createSelector(
  selectActivePhoto,
  prop('url')
)

export const selectActivePhotoTitle = createSelector(
  selectActivePhoto,
  prop('title')
)

export const selectActivePhotoNotes = createSelector(
  selectActivePhoto,
  prop('notes')
)
