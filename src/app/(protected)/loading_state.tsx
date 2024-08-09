import { LucideLoaderCircle } from "lucide-react";
import loadingAnimation from "@/loading.json";
import Lottie from "lottie-react";

export default function LoadingState() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/100 backdrop-blur-lg flex justify-center items-center">
      <div className="flex flex-row gap-3">
        <div className="p-10 border border-black/20 rounded-full">
          <Lottie animationData={loadingAnimation} loop={true} height={50} width={50} className="rounded-full" />
        </div>
      </div>
    </div>
  );
}
