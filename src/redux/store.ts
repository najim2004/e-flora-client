import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/apiSlice";
import persistedUserReducer from "@/redux/features/user/userSlice";
import cropSuggestionReducer from "@/redux/features/cropSuggestions/cropSuggestionSlice";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: persistedUserReducer,
    cropSuggestion: cropSuggestionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
