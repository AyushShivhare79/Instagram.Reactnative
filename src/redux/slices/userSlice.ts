import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  items: FirebaseAuthTypes.User | null;
}

const initialState: UserState = {
  items: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.items = action.payload;
    },
    clearUser(state) {
      state.items = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
