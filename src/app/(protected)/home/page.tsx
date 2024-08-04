"use client";
import { useEffect, useState } from "react";
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
import "react-day-picker/style.css";
import CommandButton from "@/components/command/command-button";
import queryKey from "@/lib/queryKeys";
import CalendarCard from "@/components/entries/calendar/calendar";
import { DayPicker } from "react-day-picker";
import { useDateStore } from "@/app/states/calendarState";
import AudioCard from "@/components/entries/audio/audio-card";
import AddButton from "@/components/ui/add-button";
import { AnimatePresence, m, motion } from "framer-motion";
const HomePage = () => {
  const { selectedDate, setSelectedDate } = useDateStore();

  const [openSummarizer, setSummarizer] = useState(false);

  const [allEntries = [], setAllEntries] = useState([]);

  const [filteredEntries, setFilteredEntries] = useState([]);

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: [queryKey.ALL_ENTRIES, selectedDate],
    queryFn: () => getAllEntries(selectedDate),
    enabled: !!selectedDate,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      setAllEntries(data);
    }
  }, [data]);

  const handleSelectDay = (date: Date) => {};

  {
    isError && <div>Error</div>;
  }

  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Popover open={popoverOpen}>
          <PopoverTrigger asChild>
            <AnimatePresence>
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <Button
                  variant={"outline"}
                  className="border-none w-52 rounded-full font-semibold text-md text-primary hover:text-primary"
                  onClick={() => setPopoverOpen((prev) => !prev)}
                >
                  <CalendarIcon className="mr-2" size={20} />
                  {format(selectedDate, "PPP")}
                </Button>
              </motion.div>
            </AnimatePresence>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 bg-white/40 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl">
            <DayPicker
              mode="single"
              style={{
                width: "auto",
                backgroundColor: "transparent",
              }}
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date || new Date());
                setPopoverOpen(false);
              }}
              showOutsideDays
            />
          </PopoverContent>
        </Popover>

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
                      setSelectedDate(new Date());
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

      {data?.length > 0 && (
        <>
          <SummarizerComponent data={data} openState={openSummarizer} />

          <div className="flex flex-row py-4 gap-2">
            <Button
              className="rounded-full bg-primary hover:bg-primary/80 hover:text-white text-white border-none"
              variant={"outline"}
            >
              All
            </Button>
            <Button
              className="rounded-full bg-transparent border hover:bg-white/10 border-black/20"
              variant={"outline"}
            >
              Notes
            </Button>
            <Button
              className="rounded-full bg-transparent border hover:bg-white/10 border-black/20"
              variant={"outline"}
            >
              Audio
            </Button>

            <Button
              className="rounded-full bg-transparent border hover:bg-white/10 border-black/20"
              variant={"outline"}
            >
              Calendar
            </Button>
          </div>
        </>
      )}

      {isLoading && <div>Loading...</div>}

      {!isLoading && !isError && isSuccess && data.length === 0 && (
        <div className="w-full h-[350px]">
          <EmptyFolder
            title="No entries found"
            description="Connect a service or insert a new block"
          />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-auto">
        {data &&
          allEntries.map((entry: any, index: any) => {
            switch (entry.type) {
              case "note":
                return <NoteCard key={entry.id} entry={entry} index={index} />;
              case "calendar":
                return (
                  <CalendarCard key={entry.id} entry={entry} index={index} />
                );
              case "audio":
                return <AudioCard key={entry.id} entry={entry} index={index} />;
              case "spotify":
              // return <SpotifyCard key={entry.id} content={entry} />;
              default:
                return null;
            }
          })}
      </div>
      <div className="h-36" />
      <CommandButton />
      <AddButton />
    </>
  );
};

export default HomePage;
