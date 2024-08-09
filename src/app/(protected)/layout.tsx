import Sidebar from "@/components/sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner";
import Loading from "./loading_state";
import { useLoadingState } from "./loadingState";
import { Onborda, OnbordaProvider } from "onborda";
import { steps } from "@/lib/steps";
import CustomCard from "@/components/ui/CustomCard";

const Layout = ({ children }: any) => {
  return (
    <>
      <OnbordaProvider>
        <Onborda steps={steps} cardComponent={CustomCard}  >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto p-6">{children}</main>
            <Toaster />
          </div>
        </Onborda>
      </OnbordaProvider>
    </>
  );
};

export default Layout;
