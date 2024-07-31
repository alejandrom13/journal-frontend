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
const HomePage = () => {
  const { selectedDate, setSelectedDate } = useDateStore();

  const [openSummarizer, setSummarizer] = useState(false);

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: [queryKey.ALL_ENTRIES, selectedDate],
    queryFn: () => getAllEntries(selectedDate),
    enabled: !!selectedDate,
  });

  const handleSelectDay = (date: Date) => {};

  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <div className="">
        <Popover open={popoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="border-none rounded-full font-semibold text-md"
              onClick={() => setPopoverOpen((prev) => !prev)}
            >
              <CalendarIcon className="mr-2" size={20} />
              {format(selectedDate, "PPP")}
            </Button>
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
            />
          </PopoverContent>
        </Popover>

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
            <div className="pt-6"></div>
          </>
        )}

        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}

        {!isLoading && !isError && isSuccess && data.length === 0 && (
          <div className="w-full h-[350px]">
            <EmptyFolder
              title="No entries found"
              description="Connect a service or insert a new block"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {data &&
            data?.map((entry: any, index: any) => {
              switch (entry.type) {
                case "note":
                  return (
                    <NoteCard key={entry.id} entry={entry} index={index} />
                  );
                case "calendar":
                  return (
                    <CalendarCard key={entry.id} entry={entry} index={index} />
                  );
                case "spotify":
                // return <SpotifyCard key={entry.id} content={entry} />;
                default:
                  return null;
              }
            })}
        </div>
      </div>
      <div className="h-36" />
      <CommandButton />
    </>
  );
};

export default HomePage;
