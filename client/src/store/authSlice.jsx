import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData.name, userData.email, userData.password);
    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData.email, userData.password);
    localStorage.setItem('user', JSON.stringify(response.data));
    authService.setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    const message = error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('user')?.token;
    if (token) {
      authService.setAuthToken(token);
      const response = await authService.loadUser();
      return response.data;
    } else {
      return thunkAPI.rejectWithValue('No token found');
    }
  } catch (error) {
    const message = error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    await authService.logout();
    localStorage.removeItem('user');
    authService.setAuthToken();
  } catch (error) {
    const message = error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
