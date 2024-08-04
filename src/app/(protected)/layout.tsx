import Sidebar from "@/components/sidebar/sidebar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

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
