import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@/components/ui/button";
import { LucidePause, LucidePlay, Trash2 } from "lucide-react";
import { useWavesurfer } from "@wavesurfer/react";
import { getTranscript } from "@/actions/speech-to-text";
import { duration } from "moment";
import { exit } from "process";
import DeleteEntryButton from "../delete-entry-button";

const fadeInFromLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const AudioCard = ({ entry, index }: any) => {
  const [content, setContent] = useState<any>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [showTranscript, setShowTranscript] = useState(false);

  const containerRef2 = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef2,
    url: "https://journal-storage.up.railway.app/api" + entry?.content?.url!,
    waveColor: "#92B7F2",
    progressColor: "#3379E3",
    barGap: 2,
    cursorWidth: 0,
    barWidth: 3,
    barRadius: 30,
    height: 50,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <motion.div
      className="min-h-[150px] flex flex-col w-full bg-white/40 p-4 rounded-3xl ease-in group hover:bg-white/60 transition-all duration-150"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear", delay: index * 0.05 }}
    >
      <div className="flex flex-row items-center">
        <div className="flex ">
          <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
          >
            <path
              d="M9 0C9.24493 3.23106e-05 9.48134 0.0899562 9.66437 0.252715C9.84741 0.415475 9.96434 0.639749 9.993 0.883L10 1V17C9.99972 17.2549 9.90212 17.5 9.72715 17.6854C9.55218 17.8707 9.31305 17.9822 9.05861 17.9972C8.80416 18.0121 8.55362 17.9293 8.35817 17.7657C8.16271 17.6021 8.0371 17.3701 8.007 17.117L8 17V1C8 0.734784 8.10536 0.48043 8.29289 0.292893C8.48043 0.105357 8.73478 0 9 0ZM5 3C5.26522 3 5.51957 3.10536 5.70711 3.29289C5.89464 3.48043 6 3.73478 6 4V14C6 14.2652 5.89464 14.5196 5.70711 14.7071C5.51957 14.8946 5.26522 15 5 15C4.73478 15 4.48043 14.8946 4.29289 14.7071C4.10536 14.5196 4 14.2652 4 14V4C4 3.73478 4.10536 3.48043 4.29289 3.29289C4.48043 3.10536 4.73478 3 5 3ZM13 3C13.2652 3 13.5196 3.10536 13.7071 3.29289C13.8946 3.48043 14 3.73478 14 4V14C14 14.2652 13.8946 14.5196 13.7071 14.7071C13.5196 14.8946 13.2652 15 13 15C12.7348 15 12.4804 14.8946 12.2929 14.7071C12.1054 14.5196 12 14.2652 12 14V4C12 3.73478 12.1054 3.48043 12.2929 3.29289C12.4804 3.10536 12.7348 3 13 3ZM1 6C1.26522 6 1.51957 6.10536 1.70711 6.29289C1.89464 6.48043 2 6.73478 2 7V11C2 11.2652 1.89464 11.5196 1.70711 11.7071C1.51957 11.8946 1.26522 12 1 12C0.734784 12 0.48043 11.8946 0.292893 11.7071C0.105357 11.5196 0 11.2652 0 11V7C0 6.73478 0.105357 6.48043 0.292893 6.29289C0.48043 6.10536 0.734784 6 1 6ZM17 6C17.2449 6.00003 17.4813 6.08996 17.6644 6.25272C17.8474 6.41547 17.9643 6.63975 17.993 6.883L18 7V11C17.9997 11.2549 17.9021 11.5 17.7272 11.6854C17.5522 11.8707 17.313 11.9822 17.0586 11.9972C16.8042 12.0121 16.5536 11.9293 16.3582 11.7657C16.1627 11.6021 16.0371 11.3701 16.007 11.117L16 11V7C16 6.73478 16.1054 6.48043 16.2929 6.29289C16.4804 6.10536 16.7348 6 17 6Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="text-sm font-semibold text-primary pl-2">
          Voice Note
        </div>
        <div className="ml-2 bg-primary/10 rounded-full p-1 text-sm px-4 text-primary">
          {isPlaying
            ? formatTime(currentTime)
            : wavesurfer?.getDuration()
            ? formatTime(wavesurfer.getDuration())
            : "00:00"}
        </div>

        <div className="ml-auto flex flex-row items-center">
          <div className="h-full gap-2">
            {(entry?.content?.transcript || isPlaying) && (
              <Button
                className="h-[28px] rounded-full text-primary hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                variant={"ghost"}
                onClick={async () => {
                  if (!isPlaying) {
                    setShowTranscript(!showTranscript);
                  }
                }}
              >
                {showTranscript ? "Hide Transcript" : "Show Transcript"}
              </Button>
            )}
          </div>
          <DeleteEntryButton entryId={entry?.id} />
        </div>
      </div>
      <div className="pt-2 pb-1 "></div>

      <div className="w-full h-full bg-white/50 rounded-xl flex flex-row items-center gap-2 p-2">
        <Button onClick={onPlayPause} className="rounded-full" size={"icon"}>
          {isPlaying ? <LucidePause size={20} /> : <LucidePlay size={20} />}
        </Button>
        <div className="flex flex-auto">
          <div ref={containerRef2} style={{ width: "100%", zIndex: 0 }}></div>
        </div>
      </div>
      {(showTranscript || isPlaying) && (
        <motion.div
          className="p-2 text-sm text-black/70"
          variants={fadeInFromLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }} // Adjust duration as needed
        >
          {entry?.content?.transcript}.
        </motion.div>
      )}
    </motion.div>
  );
};

export default AudioCard;

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");
