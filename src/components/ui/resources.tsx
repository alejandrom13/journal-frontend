import { generateSummary } from "@/actions/ai";
import { useMutation } from "@tanstack/react-query";
import {
  WandSparkles,
  ChevronDown,
  LucideLoaderCircle,
  LucideCheckCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { motion, useAnimation } from "framer-motion";
import { formatData } from "@/lib/ai/formatData";
import { useCompletion } from "ai/react";
import { duration } from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SentimentType } from "@/lib/sentimentSchema";
interface SummarizerProps {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  sentimentData: any;
}

const ResourcesComponent = ({
  data,
  open,
  setOpen,
  sentimentData,
}: SummarizerProps) => {


  const { completion, complete, isLoading } = useCompletion({
    api: "api/insights",
    body: {
      data: data ? formatData(data) : "",
      emotions: sentimentData?.map(
        (item: any, index: any) => item.feeling + " , " + item.score
      ),
    },
  });

  const controls = useAnimation();

  const handleGenerateSummary = async () => {
    await complete(formatData(data));
    controls.start({ opacity: 1, y: 0 });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, duration: 0.5 },
  };

  // if (isSuccess) {
  //   htmlContent = marked(aiData);
  // }

  return (
    <div
      className={`w-full bg-white/40 p-4 rounded-3xl transition-all ease-in
  ${open ? "ring-2 ring-offset-2 ring-primary" : ""}
  `}
    >
      <div
        className="w-full bg-white/60 h-16 rounded-xl flex flex-row items-center p-4 cursor-pointer hover:bg-white transition-all"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
            handleGenerateSummary();
            // mutate();
          }
        }}
      >
        <div className="flex flex-row gap-4 items-center">
          <Icon
            icon="mingcute:sparkles-fill"
            width="24"
            height="24"
            className="text-primary"
          />{" "}
          <h6 className="text-md font-medium text-primary">
            Resources & Recommendations
          </h6>
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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="p-4 pb-4 pt-4 prose prose-strong:text-black prose-headings:text-black text-[18px] font-normal py-1 text-gray-900 prose-bold:text-white prose-bold:font-semibold prose-2xl:font-normal prose-2xl:text-lg prose-2xl:py-2 prose-2xl:leading-1.5"
          >
            {completion.split("\n").map((paragraph, index) => (
              <motion.p
                key={index}
                variants={item}
                dangerouslySetInnerHTML={{ __html: marked(paragraph)! }}
              />
            ))}
          </motion.div>

          {isLoading ? (
            <div className="text-lg flex flex-row gap-2 p-2 bg-primary/10 rounded-full w-fit animate-pulse">
              <LucideLoaderCircle
                size={24}
                className="text-primary animate-spin"
              />
              Gathering Resources & Recommendations...
            </div>
          ) : (
            <>
              <div className="text-lg flex flex-row gap-2 p-3 bg-primary/10 rounded-full w-fit">
                <LucideCheckCircle size={24} className="text-primary" />
                Resources & Recommendations Gathered
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesComponent;

function useTypewriter(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayedText;
}
