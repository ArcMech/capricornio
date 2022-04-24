import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { api } from 'api'
import { Project } from 'types'
import { RootState } from '..'

export const fetchProjectsList = createAsyncThunk(
  'projects/getAll',
  async () => {
    const response = await api('projects/')
    return response.data
  },
)

const projectsAdapter = createEntityAdapter<Project>({
  selectId: (user) => user.id,
})

type InitialState = {
  loading: boolean
  error: string | null
}

const projectsSlice = createSlice({
  name: 'users',
  initialState: projectsAdapter.getInitialState<InitialState>({
    loading: false,
    error: '',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsList.fulfilled, (state, action) => {
        projectsAdapter.setAll(state, action.payload)
        state.loading = false
        state.error = ''
      })
      .addCase(fetchProjectsList.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchProjectsList.rejected, (state) => {
        state.loading = false
        state.error = 'Error fetching projecrs'
      })
  },
})

export const projectsSelectors = projectsAdapter.getSelectors<RootState>(
  (state) => state.projects,
)

export default projectsSlice.reducer
