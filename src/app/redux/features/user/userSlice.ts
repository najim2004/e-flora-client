import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null as User | null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "isAuthenticated"], // specify which state you want to persist
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUser, clearUser } = userSlice.actions;

export default persistedUserReducer;
