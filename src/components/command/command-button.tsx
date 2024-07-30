import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { AudioLinesIcon, Calendar, Menu, Pen } from "lucide-react";
import Editor from "../editor/advanced-editor";
import { motion, AnimatePresence } from "framer-motion";
import CreateNote from "./create-note";
import AudioRecorder from "../entries/audio/audio-recorder";

const CommandButton = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const buttons = [
    { icon: Pen, key: "editor" },
    { icon: AudioLinesIcon, key: "audio" },
    { icon: Calendar, key: "calendar" },
    { icon: Menu, key: "menu" },
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "n":
        case "N":
          setActiveButton("editor");
          break;
        case "a":
        case "A":
          setActiveButton("audio");
          break;
        case "Escape":
          setActiveButton(null);
          break;
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeButton]); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="fixed bottom-0 left-[60%] -translate-x-1/2 mb-10 bg-white/50 backdrop-blur-lg rounded-[45px] p-3 overflow-hidden flex flex-col justify-end ">
      <AnimatePresence>
        {activeButton === "editor" && <CreateNote key="editor" />}
        {activeButton === "audio" && <AudioRecorder />}
        
      </AnimatePresence>
      {/* Add other components for different button actions here */}

      <div className="flex flex-row justify-center items-center gap-3 ">
        {buttons.map(({ icon: Icon, key }) => (
          <Button
            key={key}
            variant="ghost"
            className={`rounded-full w-[90px] h-[60px] gap-3 bg-white duration-200 transition-all ${
              activeButton === key
                ? "text-white bg-[#3379E3] hover:bg-[#3379E3] hover:text-white"
                : "text-[#3379E3]"
            }`}
            onClick={() => setActiveButton(activeButton === key ? null : key)}
          >
            <Icon size={20} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CommandButton;
