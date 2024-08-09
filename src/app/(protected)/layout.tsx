import Sidebar from "@/components/sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner";
import Loading from "./loading_state";
import { useLoadingState } from "./loadingState";

const Layout = ({ children }: any) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
        <Toaster />
      </div>
    </>
  );
};

export default Layout;
