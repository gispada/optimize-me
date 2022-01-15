import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  filters: {},
  albums: [],
  photos: [],
  users: [],
  activePhoto: null
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setAlbums: (state, { payload }) => {
      state.albums = payload
    },
    setPhotos: (state, { payload }) => {
      state.photos = payload
    },
    setUsers: (state, { payload }) => {
      state.users = payload
    },
    setAlbumRating: (state, { payload }) => {
      const albumToModify = state.albums.find(({ id }) => id === payload.id)
      albumToModify.rating = payload.value
    },
    setFilter: (state, { payload }) => {
      state.filters[payload.name] = payload.value
    },
    removeFilter: (state, { payload }) => {
      delete state.filters[payload.name]
    },
    resetFilters: state => {
      state.filters = {}
    },
    setActivePhoto: (state, { payload }) => {
      state.activePhoto = payload
    },
    setPhotoNotes: (state, { payload }) => {
      const photoToModify = state.photos.find(({ id }) => id === payload.id)
      photoToModify.notes = payload.value
    },
    reset: () => initialState
  }
})

export const name = gallerySlice.name

export const galleryActions = gallerySlice.actions

export default gallerySlice.reducer
