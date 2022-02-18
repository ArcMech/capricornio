import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { api } from 'api'
import { User } from 'types'
import { RootState } from '..'

export const login = createAsyncThunk(
  'users/auth',
  async (data: { email: string; password: string }) => {
    const response = await api({ url: 'auth/', method: 'post', data })
    return response.data
  },
)

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
  user: User | null
}

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<InitialState>({
    loading: false,
    error: '',
    user: null,
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
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('token', action.payload.access_token)
      })
  },
})

export const userSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
)

export default usersSlice.reducer
