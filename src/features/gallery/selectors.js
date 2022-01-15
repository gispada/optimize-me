import { capitalize } from 'lodash'
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

export const selectAlbums = createSelector(selectState, ({ albums, users }) => {
  return albums.map(album => ({
    ...album,
    title: capitalize(album.title),
    author: users.find(({ id }) => id === album.userId)?.name
  }))
})
