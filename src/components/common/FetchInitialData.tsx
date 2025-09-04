"use client";
import {
  useLogoutMutation,
  useMeQuery,
} from "@/redux/features/user/userApiSlice";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const FetchInitialData = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  useMeQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [logOut] = useLogoutMutation();
  useEffect(() => {
    if (!isAuthenticated) {
      logOut({});
    }
  }, [isAuthenticated, logOut]);
  return <></>;
};

export default FetchInitialData;
