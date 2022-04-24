import { configureStore } from '@reduxjs/toolkit'
import users from './users/usersSlice'
import projects from './projects/projectsSlice'

export const store = configureStore({
  reducer: { users, projects },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
