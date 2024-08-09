import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { AudioLinesIcon, Calendar, Menu, Pen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateNote from "./create-note";
import AudioRecorder from "../entries/audio/audio-recorder";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useKeystrokeState } from "@/app/states/keyStrokeState";
import CreateCalendarEntry from "../entries/calendar/create-calendar";
import MenuEntry from "../entries/menu/menu-entry";

const CommandButton = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { enableKeyStroke } = useKeystrokeState();

  const buttons = [
    { icon: Pen, key: "editor", label: "New Note", shortcut: "N" },
    { icon: AudioLinesIcon, key: "audio", label: "New Audio", shortcut: "A" },
    // { icon: Calendar, key: "calendar", label: "Calendar", shortcut: "C" },
    { icon: Menu, key: "menu", label: "Menu", shortcut: "M" },
  ];

  useEffect(() => {
    if (!enableKeyStroke) return;
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "n":
        case "N":
          setActiveButton("editor");

          break;
        case "a":
        case "A":
          activeButton !== null
            ? setActiveButton(activeButton)
            : setActiveButton("audio");
          break;

          case "M":
            case "m":
              activeButton !== null
                ? setActiveButton(activeButton)
                : setActiveButton("menu");
              break; 
        case "Escape":
          setActiveButton(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeButton, enableKeyStroke]);
  return (
    <div className=" fixed bottom-0 left-[60%] -translate-x-1/2 mb-10 bg-white/50 backdrop-blur-lg rounded-[45px] p-3   flex-col justify-end hidden sm:block"
    id="onborda-step3"
    >
      <AnimatePresence>
        {activeButton === "editor" && <CreateNote key="editor" />}
        {activeButton === "audio" && <AudioRecorder key="audio" />}
        {activeButton === "menu" && <MenuEntry key="menu" />}
      </AnimatePresence>

      <div className="flex flex-row justify-center items-center gap-3 ">
        {buttons.map(({ icon: Icon, label, shortcut, key }) => (
          <TooltipProvider key={key}>
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`rounded-full w-[90px] h-[60px] gap-3 bg-white duration-200   ${
                    activeButton === key
                      ? "text-white bg-primary hover:bg-primary  hover:text-white"
                      : "text-primary"
                  }`}
                  onClick={() =>
                    setActiveButton(activeButton === key ? null : key)
                  }
                >
                  <Icon size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-row gap-2">
                  <h6 className="text-md font-medium ">{label}</h6>
                  <h6 className="text-md font-semibold text-black/50">
                    {shortcut}
                  </h6>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default CommandButton;
