import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { api } from 'src/api'
import { User } from 'src/types'

export const fetchUsersList = createAsyncThunk('users/listAll', async () => {
  const response = await api('users/')
  return response.data
})
export const addUser = createAsyncThunk('users/addOne', async (data: any) => {
  const response = await api({ url: 'users/', method: 'post', data })
  return response.data
})

const usersAdapter = createEntityAdapter<User>({ selectId: (user) => user.id })

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        usersAdapter.addMany(state, action.payload)
        state.loading = false
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)
        state.loading = false
        state.error = null
      })
  },
})

export default usersSlice.reducer
