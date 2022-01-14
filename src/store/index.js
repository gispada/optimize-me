import { configureStore } from '@reduxjs/toolkit'

// Auto import all reducers
const reducersContext = require.context('../features', true, /reducer\.js$/)

const reducer = reducersContext.keys().reduce((acc, key) => {
  const { name, default: reducer } = reducersContext(key)
  return { ...acc, [name]: reducer }
}, {})

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
})
