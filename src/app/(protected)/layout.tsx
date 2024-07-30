import Sidebar from "@/components/sidebar/sidebar";

const Layout = ({ children }: any) => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </>
  );
};

export default Layout;
