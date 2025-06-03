"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

/**
 * ReduxProvider Component:
 *
 * This component wraps the application with the Redux Provider,
 * making the Redux store available to all connected components.
 */
interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
