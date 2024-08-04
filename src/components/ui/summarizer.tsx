import { generateSummary } from "@/actions/ai";
import { useMutation } from "@tanstack/react-query";
import { WandSparkles, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { motion } from "framer-motion";
import { formatData } from "@/lib/ai/formatData";
interface SummarizerProps {
  data: any;
  openState?: boolean;
}

const SummarizerComponent = ({ data, openState }: SummarizerProps) => {
  const [open, setOpen] = useState(openState);

  useEffect(() => {
    setOpen(openState);
  }, [openState]);

  const {
    mutate,
    data: aiData,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["summarize"],
    mutationFn: () => generateSummary(formatData(data)),
  });

  let htmlContent;

  if (isSuccess) {
    htmlContent = marked(aiData);
  }

  return (
    <div
      className={`w-full bg-white/40 p-4 rounded-3xl transition-all ease-in
  ${open ? "shadow-[0_0_10px_4px_rgba(51,121,227,0.5)]" : ""}
  `}
    >
      <div
        className="w-full bg-white/60 h-16 rounded-xl flex flex-row items-center p-4 cursor-pointer hover:bg-white transition-all"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
            mutate();
          }
        }}
      >
        <div className="flex flex-row gap-4 items-center">
          <WandSparkles size={24} className={`text-[#3379E3]`} />
          <h6 className="text-md font-medium text-[#3379E3]">Summarized</h6>
        </div>

        <div className="ml-auto">
          <ChevronDown
            size={24}
            className={`text-slate-800  ${
              open ? "rotate-180" : ""
            }  transition-transform duration-300`}
          />
        </div>
      </div>

      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={{ maxHeight: open ? "2000px" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div>
          {isPending && <div className="text-lg pt-4">Summarizing...</div>}
          <article
            className="p-4 pb-4 pt-4 prose prose-strong:text-black prose-headings:text-black text-[18px] font-normal py-1 text-gray-900 prose-bold:text-white prose-bold:font-semibold prose-2xl:font-normal prose-2xl:text-lg prose-2xl:py-2 prose-2xl:leading-1.5"
            dangerouslySetInnerHTML={{ __html: htmlContent! }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SummarizerComponent;
