import Sidebar from "@/components/sidebar/sidebar";
import { useEffect } from "react";

const Layout = ({ children }: any) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </>
  );
};

export default Layout;
