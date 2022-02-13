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

type InitialState = {
  loading: boolean
  error: string | null
  entities: User[]
}

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    entities: [],
    loading: false,
    error: null,
  }) as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.entities = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.entities = [...state.entities, action.payload]
        state.loading = false
        state.error = null
      })
  },
})

export default usersSlice.reducer
