"use client";
import { useEffect, useMemo, useState } from "react";
import SummarizerComponent from "@/components/ui/summarizer";
import { useQuery } from "@tanstack/react-query";
import { getAllEntries } from "@/actions/entries";
import NoteCard from "@/components/entries/note/note-card";
import MonthCarousel from "@/components/entries/day-selector";
import EmptyFolder from "@/components/empty-states/empty-folder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns-tz";
import CommandButton from "@/components/command/command-button";
import queryKey from "@/lib/queryKeys";
import CalendarCard from "@/components/entries/calendar/calendar";
import { DayPicker } from "react-day-picker";
import { useDateStore } from "@/app/states/calendarState";
import AudioCard from "@/components/entries/audio/audio-card";
import AddButton from "@/components/ui/add-button";
import { AnimatePresence, m, motion } from "framer-motion";
import HomeSkeletonLoader from "./skeleton";
import MainLogo from "@/lib/logo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Entry } from "@/lib/entryType";
import MoodCard from "@/components/entries/mood/mood-card";
import { useHotkeys } from "react-hotkeys-hook";
import { useOnborda } from "onborda";
import { useClerk, useUser } from "@clerk/nextjs";

const HomePage = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const [openSummarizer, setSummarizer] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [displayedMonth, setDisplayedMonth] = useState<Date>(new Date());

  const { isLoading, isError, data, isSuccess } = useQuery<Entry[]>({
    queryKey: [queryKey.ALL_ENTRIES, selectedDate],
    queryFn: () => getAllEntries(selectedDate),
    enabled: !!selectedDate,
    retry: 1,
  });

  useHotkeys(
    "left",
    () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(newDate);
      setSummarizer(false);
    },
    {
      enableOnFormTags: false,
      enableOnContentEditable: false,
    }
  );

  useHotkeys(
    "right",
    () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(newDate);
      setSummarizer(false);
    },
    {
      enableOnFormTags: false,
      enableOnContentEditable: false,
    }
  );

  useHotkeys(
    "up",
    () => {
      //todays date
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      setSelectedDate(now);
      setSummarizer(false);
    },
    {
      enableOnFormTags: false,
      enableOnContentEditable: false,
    }
  );
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedType === "all") {
      return data;
    }
    return data.filter((item) => item.type === selectedType);
  }, [data, selectedType]);

  const uniqueTypes = useMemo(() => {
    if (!data) return ["all"];
    const types = [...new Set(data.map((item) => item.type))];
    return ["all", ...types];
  }, [data]);

  const [columnsCount, setColumnsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setColumnsCount(1); // mobile
      } else if (window.innerWidth < 1500) {
        setColumnsCount(2); // tablet
      } else {
        setColumnsCount(3); // desktop
      }
    };

    // Set the initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
  };
  {
    isError && <div>Error</div>;
  }
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { startOnborda } = useOnborda();
  const { user } = useClerk();

  useEffect(() => {
    
    if (
      user?.publicMetadata?.onboardingCompleted === false ||
      user?.publicMetadata?.onboardingCompleted === undefined ||
      user?.publicMetadata === undefined
    ) {
      startOnborda();
    }
  }, [
    startOnborda,
    user?.publicMetadata,
    user?.publicMetadata?.onboardingCompleted,
  ]);

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="">
          <Popover open={popoverOpen}>
            <AnimatePresence>
              <PopoverTrigger asChild>
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  id="onborda-step2"
                >
                  <Button
                    variant={"outline"}
                    className="border-none  rounded-full font-semibold text-md text-primary hover:text-primary"
                    onClick={() => setPopoverOpen((prev) => !prev)}
                  >
                    <CalendarIcon className="mr-2" size={20} />
                    {format(selectedDate, "PPP")}
                  </Button>
                </motion.div>
              </PopoverTrigger>
            </AnimatePresence>

            <PopoverContent className="w-auto p-4 bg-white/40 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl">
              <DayPicker
                mode="single"
                captionLayout="dropdown"
                numberOfMonths={1}
                style={{
                  width: "auto",
                  backgroundColor: "transparent",
                }}
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date || new Date());
                  setPopoverOpen(false);
                }}
                month={displayedMonth}
                onMonthChange={(month) => setDisplayedMonth(month)}
                showOutsideDays
              />
            </PopoverContent>
          </Popover>
        </div>

        <AnimatePresence>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex"
          >
            {selectedDate &&
              (selectedDate.getDate() !== new Date().getDate() ||
                selectedDate.getMonth() !== new Date().getMonth() ||
                selectedDate.getFullYear() !== new Date().getFullYear()) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    className="ml-2 rounded-full border border-primary/20 bg-transparent font-semibold text-md text-primary hover:text-primary"
                    onClick={() => {
                      // Get the current date in the user's local timezone
                      const localDate = new Date();

                      // Set the selected date and displayed month as a Date object
                      setSelectedDate(localDate);
                      setDisplayedMonth(localDate);
                      setSummarizer(false);
                    }}
                    variant={"outline"}
                  >
                    Today
                  </Button>
                </motion.div>
              )}
          </motion.div>
        </AnimatePresence>
      </div>

      <MonthCarousel
        initialDate={selectedDate}
        onChange={(newDate) => {
          setSelectedDate(newDate);
          setSummarizer(false);
        }}
      />

      <div className="pt-6"></div>

      {data?.length! > 0 && (
        <>
          <SummarizerComponent data={data} openState={openSummarizer} />

          <div className="flex flex-wrap py-4 gap-2">
            <AnimatePresence initial={false}>
              {uniqueTypes.map((type) => (
                <motion.div
                  key={type}
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
                      selectedType === type
                        ? "bg-primary hover:bg-primary/80 text-white hover:text-white"
                        : "bg-transparent border hover:bg-white/10 border-black/20"
                    }`}
                    variant="outline"
                    onClick={() => handleFilterChange(type)}
                  >
                    {entryType(type)}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {isLoading && (
        <>
          <HomeSkeletonLoader />
        </>
      )}

      {!isLoading && !isError && isSuccess && data.length === 0 && (
        <div className="w-full h-[350px]">
          <EmptyFolder
            title="No entries found"
            description="Connect a service or insert a new block"
          />
        </div>
      )}
      <Masonry gutter="20px" columnsCount={columnsCount}>
        {/* className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-auto" */}
        {filteredData?.map((entry: any, index: any) => {
          switch (entry.type) {
            case "note":
              return (
                <NoteCard
                  key={entry.id}
                  entry={entry}
                  index={index}
                  id={entry.id}
                />
              );
            case "calendar":
              return (
                <CalendarCard key={entry.id} entry={entry} index={index} />
              );
            case "audio":
              return <AudioCard key={entry.id} entry={entry} index={index} />;
            case "mood":
              return <MoodCard key={entry.id} entry={entry} index={index} />;
            case "spotify":
            // return <SpotifyCard key={entry.id} content={entry} />;
            default:
              return null;
          }
        })}
      </Masonry>
      <div className="h-36" />
      <CommandButton />
      <AddButton />
    </>
  );
};

export default HomePage;

function entryType(type: string) {
  switch (type) {
    case "note":
      return "Notes";
    case "calendar":
      return "Calendar";
    case "audio":
      return "Audio";
    case "spotify":
      return "Spotify";
    case "mood":
      return "Mood";
    case "all":
      return "All";
    default:
      return null;
  }
}


