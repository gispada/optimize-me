import { createSelector } from 'reselect'

const selectState = state => state.gallery

export const isLoading = createSelector(
  selectState,
  substate => substate.loading
)

export const selectUsers = createSelector(
  selectState,
  substate => substate.users
)

export const selectFilters = createSelector(
  selectState,
  substate => substate.filters
)

export const selectAlbums = createSelector(
  selectState,
  substate => substate.albums
)

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

export const selectActivePhoto = createSelector(
  selectState,
  substate => substate.activePhoto
)

export const selectPhotos = createSelector(
  selectState,
  substate => substate.photos
)
