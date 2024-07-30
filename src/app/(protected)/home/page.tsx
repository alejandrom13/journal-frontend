"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import AddButton from "@/components/ui/add-button";
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
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns-tz";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import CommandButton from "@/components/command/command-button";
import queryKey from "@/lib/queryKeys";
import CalendarCard from "@/components/entries/calendar/calendar";


const HomePage = () => {
  const clerk = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isLoading, isError, data } = useQuery({
    queryKey: [queryKey.ALL_ENTRIES, selectedDate],
    queryFn: () => getAllEntries(selectedDate),
    enabled: !!selectedDate,
  });

  const handleSelectDay = (date: Date) => {
    console.log("Selected date:", date);
  };

  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <div className="container ">
        {/* <AddButton /> */}

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
            console.log("New date selected:", newDate);
          }}
        />
        <div className="pt-6"></div>

        {data?.length > 0 && (
          <>
            <SummarizerComponent />
            <div className="pt-6"></div>
          </>
        )}

        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {data && console.log(data)}
        {!isLoading && !isError && data && data.length === 0 && (
          <div className="w-full h-[350px]">
            <EmptyFolder
              title="No entries found"
              description="Connect a service or insert a new block"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {data &&
            data?.map((entry: any) => {
              switch (entry.type) {
                case "note":
                  return <NoteCard key={entry.id} entry={entry} />;
                case "calendar":
                 return <CalendarCard key={entry.id} entry={entry} />;
                case "spotify":
                // return <SpotifyCard key={entry.id} content={entry} />;
                default:
                  return null;
              }
            })}
        </div>
      </div>
      <div className="pt-5" />
      <CommandButton />
    </>
  );
};

export default HomePage;

/*
Category 1: Impact

Is the solution easy and enjoyable to use for everyone, including people with disabilities? (maximum 5 points)
5

Does this solution have potential to contribute meaningfully to environmental sustainability?(maximum 5 points)
0

Does this solution have potential to contribute meaningfully to improving people's lives? (maximum 5 points)
3



Category 2: Remarkability

Is the submission surprising to those that are well-versed in Large Language Models (“LLM”)? (maximum 5 points)
2

Is the submission surprising to those that are not well-versed in LLM? (maximum 5 points)
4



Category 3: Creativity

Does the submission differ from existing, well known, applications in functionality? (maximum 5 points)
3

Does the submission differ from existing, well known, applications in user experience? (maximum 5 points)
4

Is the submission implemented through the use of creative problem-solving approaches? (maximum 5 points)
4



Category 4: Usefulness

Does the submission include a well-defined target user persona/segmentation? (maximum 5 points)
4

Does the submission identify how the solution addresses specific user needs? (maximum 5 points)
4

How well does the solution, as implemented, help users meet these needs? (maximum 5 points)
2



Category 5: Execution

Is the solution well-designed and adhere to software engineering practices? (maximum 5 points)
5

Is the LLM component of the solution well-designed and adhere to Machine Learning (ML)/LLM best practices? (maximum 5 points)
3


*/
