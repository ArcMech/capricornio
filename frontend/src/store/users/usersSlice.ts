import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { api } from 'api'
import { ErrorType, User } from 'types'
import { RootState } from '..'

type LoginPayload = {
  email: string
  password: string
}

export const login = createAsyncThunk<User, LoginPayload>(
  'users/auth',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api({
        url: 'auth/',
        method: 'post',
        data: { email, password },
      })
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.response.data as ErrorType)
    }
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

const initialUser =
  localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<InitialState>({
    loading: false,
    error: '',
    user: initialUser,
  }),
  reducers: {
    logout: (state) => {
      localStorage.clear()
      state.user = null
    },
  },
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
        state.loading = false
        state.error = null
        localStorage.setItem('token', action.payload.access_token)
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        const { error } = action.payload as ErrorType
        state.error = error
        state.loading = false
      })
  },
})

export const userSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
)

export const userSelector = createSelector(
  (state: RootState) => state.users.user,
  (user) => user,
)

export const userStatusSelector = createSelector(
  (state: RootState) => state.users,
  ({ error, loading }) => ({ error, loading }),
)

export const { logout } = usersSlice.actions

export default usersSlice.reducer
