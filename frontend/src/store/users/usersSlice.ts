import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { api } from 'src/api'
import { User } from 'src/types'
import { RootState } from '..'

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
    error: '',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        usersAdapter.addMany(state, action.payload)
        state.loading = false
        state.error = ''
      })
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchUsersList.rejected, (state) => {
        state.loading = false
        state.error = 'Error fetching users'
      })
      .addCase(addUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)
        state.loading = false
        state.error = ''
      })
  },
})

export const userSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
)

export default usersSlice.reducer
