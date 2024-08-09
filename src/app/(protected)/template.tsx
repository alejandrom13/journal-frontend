"use client";

import LoadingState from "./loading_state";
import { useLoadingState } from "./loadingState";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useLoadingState();

  return <>{loading ? <LoadingState /> : children}</>;
};

export default MainTemplate;
