import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export interface User {
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
  isActive?: boolean;
}

interface UsersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  creating: boolean;
  error: string | null;
}

interface UserInput {
  name: string;
  email: string;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  creating: false,
  error: null,
};

export const loadUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(body?.message ?? 'Unable to load users.');
      }

      return body as User[];
    } catch {
      return rejectWithValue('Could not connect to the user service.');
    }
  },
);

export const addUser = createAsyncThunk<User, UserInput, { rejectValue: string }>(
  'users/addUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(body?.message ?? 'Unable to add this user.');
      }

      return body as User;
    } catch {
      return rejectWithValue('Could not connect to the user service.');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Unable to load users.';
      })
      .addCase(addUser.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to add this user.';
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;