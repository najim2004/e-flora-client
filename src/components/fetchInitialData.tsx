"use client";
import { useMeQuery } from "@/redux/features/user/userApiSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const FetchInitialData = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  useMeQuery(undefined, {
    skip: !isAuthenticated,
  });
  return <></>;
};

export default FetchInitialData;
