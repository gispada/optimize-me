import { createSlice } from '@reduxjs/toolkit'
import { set } from 'lodash'

const initialState = {
  form: {}
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setFormValue: (state, { payload }) => {
      set(state, ['form', ...payload.path.filter(Boolean)], payload.value)
    }
  }
})

export const name = registrationSlice.name

export const registrationActions = registrationSlice.actions

export default registrationSlice.reducer
