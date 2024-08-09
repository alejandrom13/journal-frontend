"use client";

import LoadingState from "./loading_state";
import { useLoadingState } from "./loadingState";
import { Onborda, OnbordaProvider } from "onborda";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useLoadingState();

  return <>{loading ? <LoadingState /> : children}</>;
};

export default MainTemplate;
