"use client";
import React, { useEffect, useState } from "react";
import { defaultValue } from "./default-value";
import HomeSkeletonLoader, { Skeleton } from "../home/skeleton";
import TotalCard from "./totalCard";
import {
  LucideAudioWaveform,
  LucideCalendar,
  LucideCheckCircle,
  LucideLoaderCircle,
} from "lucide-react";
import { useDateStore } from "@/app/states/calendarState";
import { getAllEntries, getAllEntriesByRange } from "@/actions/entries";
import queryKey from "@/lib/queryKeys";
import { Entry } from "@/lib/entryType";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { generateSentimentAnalysis } from "@/actions/ai";
import SentimentCard from "./sentiment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts";
import { returnColor } from "@/lib/returnColor";
import { formatData } from "@/lib/ai/formatData";
import { useCompletion } from "ai/react";
import { marked } from "marked";

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const uniqueTypes = [
  {
    id: "today",
    type: "Today",
  },
  {
    id: "7days",
    type: "7 days",
  },
  {
    id: "30days",
    type: "30 days",
  },
];

const InsightsPage = () => {
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return { from: today, to: today };
  });

  const { isLoading, isError, data, isSuccess } = useQuery<Entry[]>({
    queryKey: [queryKey.ALL_ENTRIES_RANGE, dateRange],
    queryFn: () => getAllEntriesByRange(dateRange),
    enabled: !!dateRange,
    retry: 1,
  });

  const {
    isLoading: isSentimentLoading,
    isError: isSentimentError,
    data: sentiment,
    isFetching: isSentimentFetching,
    isSuccess: isSentimentSuccess,
  } = useQuery<any>({
    queryKey: [queryKey.SENTIMENT_ANALYSIS, data],
    queryFn: () => generateSentimentAnalysis(data),
    enabled: !!data,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });

  const [sentimentData, setSentimentData] = useState<any>(sentiment);
  const {
    completion,
    complete,
    isLoading: completionLoading,
  } = useCompletion({
    api: "api/insights",
    body: {
      data: data ? formatData(data) : "",
      emotions: sentimentData?.map(
        (item: SentimentType) => item.feeling + " , " + item.score
      ),
    },
  });

  useEffect(() => {
    const handleGenerateSummary = async () => {
      await complete(formatData(data!));
    };
    if (isSentimentSuccess) {
      //set sentiment data ordered by score descending
      setSentimentData(
        sentiment?.sort((a: SentimentType, b: SentimentType) => {
          return b.score - a.score;
        })
      );

      handleGenerateSummary();
    }
  }, [complete, data, isSentimentSuccess, sentiment, sentimentData]);

  const [selectedType, setSelectedType] = useState("today");

  return (
    <div className=" h-full">
      {isError && <div>error</div>}

      <div className="flex flex-row py-4 gap-2 justify-center lg:justify-start">
        <AnimatePresence initial={false}>
          {uniqueTypes.map((type) => (
            <motion.div
              key={type.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.1,
              }}
            >
              <Button
                className={`rounded-full ${
                  selectedType === type.id
                    ? "bg-primary hover:bg-primary text-white hover:text-white"
                    : "bg-transparent border hover:bg-white/40 border-black/20"
                }`}
                variant="outline"
                onClick={() => {
                  setSelectedType(type.id);
                  const today = new Date();
                  let from = new Date();
                  let to = new Date();

                  if (type.id === "today") {
                    from = new Date();
                    to = new Date();
                  }

                  if (type.id === "7days") {
                    from.setDate(today.getDate() - 7);
                  }

                  if (type.id === "30days") {
                    from.setDate(today.getDate() - 30);
                  }

                  setDateRange({
                    from: from,
                    to: to,
                  });
                }}
              >
                {type.type}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isLoading && (
        <div className="flex flex-row w-full gap-4">
          <Skeleton height="100px" width="100%" className="rounded-3xl" />
          <Skeleton height="100px" width="100%" className="rounded-3xl" />
          <Skeleton height="100px" width="100%" className="rounded-3xl" />
        </div>
      )}

      {data?.length! > 0 && (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <TotalCard
            title="Notes"
            value={data?.filter((item) => item.type === "note").length || 0}
            iconSize="w-6 h-6"
            icon={
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="svg-icon"
              >
                <path
                  d="M17.75 3A3.25 3.25 0 0 1 21 6.25V13h-4.75A3.25 3.25 0 0 0 13 16.25V21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm2.81 11.5-6.06 6.06v-4.31c0-.966.784-1.75 1.75-1.75h4.31Z"
                  fill="currentColor"
                />
              </svg>
            }
            color="bg-primary/20"
          />

          <TotalCard
            title="Events"
            value={data?.filter((item) => item.type === "calendar").length || 0}
            iconSize="w-5 h-5"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="svg-icon"
                fill="currentColor"
              >
                <path d="M0,19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm17-4.5A1.5,1.5,0,1,1,15.5,16,1.5,1.5,0,0,1,17,14.5Zm-5,0A1.5,1.5,0,1,1,10.5,16,1.5,1.5,0,0,1,12,14.5Zm-5,0A1.5,1.5,0,1,1,5.5,16,1.5,1.5,0,0,1,7,14.5Z" />
                <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V8H24V7A5.006,5.006,0,0,0,19,2Z" />
              </svg>
            }
            color="bg-primary/20"
          />

          <TotalCard
            title="Audio"
            value={data?.filter((item) => item.type === "audio").length || 0}
            iconSize=""
            icon={
              <Icon
                icon="ph:microphone-fill"
                width="24"
                height="24"
                className="text-primary"
              />
            }
            color="bg-primary/20"
          />
        </div>
      )}

      <div className="flex flex-col xl:flex-row w-full gap-4 mt-4 ">
        <div className="bg-white/50 rounded-3xl p-4 flex flex-col gap-4 w-full">
          <div className="w-full p-3 flex flex-row bg-white rounded-2xl gap-2 items-center">
            <Icon
              icon="mingcute:sparkles-fill"
              width="24"
              height="24"
              className="text-primary"
            />
            <h2 className="text-lg font-medium text-primary">
              Sentiment Analysis
            </h2>
            <div className="ml-auto">
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size={"icon"}
                      className="rounded-full bg-transparent hover:bg-black/5 hover:text-primary text-black/50"
                    >
                      <Icon icon="uil:info-circle" width="20" height="20" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Sentiment analysis classifies your journal entries into
                      <br />
                      categories with scores from <strong>0</strong> (not
                      present) to <strong>100 </strong>
                      (strongly present).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {sentiment?.length > 0 && (
            <div className="p-2 gap-2 flex flex-col">
              {sentimentData?.map((item: SentimentType, index: number) => (
                <div className=" w-full group" key={index}>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row">
                        <h3 className="text-sm font-medium text-black/70">
                          {item.feeling}
                        </h3>
                        <p className="font-medium text-sm ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {item.score}%
                        </p>
                      </div>

                      <div className="w-full bg-white rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{
                            duration: 1,
                            type: "spring",
                            bounce: 0.25,
                          }}
                          className=" h-2.5 rounded-full dark:bg-gray-300"
                          style={{
                            width: `${item.score}%`,
                            backgroundColor: `${returnColor(item.feeling)}`,
                            opacity: 0.9,
                          }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(isSentimentLoading || isLoading) && (
            <div className="flex flex-col gap-4 h-full">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-white/70 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/50 rounded-3xl h-full w-full flex items-center p-4">
          {isSentimentSuccess && sentiment.length > 0 && (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square min-h-[200px] max-h-[480px] w-full"
            >
              <RadarChart data={sentiment}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="feeling" />
                <PolarGrid />
                <Radar
                  dataKey="score"
                  fill="var(--color-score)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          )}

          {(isSentimentLoading || isLoading) && (
            <div className="mx-auto aspect-square min-h-[200px] max-h-[480px] w-full">
              <div className="w-full h-full bg-white/70 rounded-2xl animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div className="p-4 w-full bg-white/50 rounded-3xl">
          <div className="w-full p-3 flex flex-row bg-white rounded-2xl gap-2 items-center">
            <Icon
              icon="mingcute:sparkles-fill"
              width="24"
              height="24"
              className="text-primary"
            />
            <h2 className="text-lg font-medium text-primary">
              Resources & Recommendations
            </h2>
            <div className="ml-auto">
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size={"icon"}
                      className="rounded-full bg-transparent hover:bg-black/5 hover:text-primary text-black/50"
                    >
                      <Icon icon="uil:info-circle" width="20" height="20" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Sentiment analysis classifies your journal entries into
                      <br />
                      categories with scores from <strong>0</strong> (not
                      present) to <strong>100 </strong>
                      (strongly present).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="p-4">
            <div
              className="p-4 pb-4 pt-4 prose prose-strong:text-black prose-headings:text-black text-[18px] font-normal py-1 text-gray-900 prose-bold:text-white prose-bold:font-semibold prose-2xl:font-normal prose-2xl:text-lg prose-2xl:py-2 prose-2xl:leading-1.5 prose-a:target-blank"
              dangerouslySetInnerHTML={{
                __html: marked(completion!),
              }}
            ></div>

            {isSentimentLoading || isLoading || completionLoading ? (
              <div className="text-lg flex flex-row gap-2 p-2 bg-primary/10 rounded-full w-fit animate-pulse">
                <LucideLoaderCircle
                  size={24}
                  className="text-primary animate-spin"
                />
                Generating Recommendations...
              </div>
            ) : (
              <>
                <div className="text-lg flex flex-row gap-2 p-3 bg-primary/10 rounded-full w-fit">
                  <LucideCheckCircle size={24} className="text-primary" />
                  Recommendations generated
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="h-10"></div>
    </div>
  );
};

interface SentimentType {
  feeling: string;
  score: number;
}

function feelingUI(item: SentimentType) {
  if (item.feeling === "Happy") {
    return <></>;
  }
}

function returnIconSentiment(feeling: string) {
  switch (feeling) {
    case "Happy":
      return "ph:smiley-fill";
    case "Sad":
      return "ph:smiley-sad-fill";
    default:
      "ph:smiley-neutral-fill";
  }
}

export default InsightsPage;
