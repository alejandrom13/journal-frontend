"use client";
import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  Mic,
  Pause,
  Play,
  Save,
  StopCircle,
  Trash,
  UploadCloudIcon,
} from "lucide-react";
import { saveRecording } from "@/actions/saveRecording";
import { useDateStore } from "@/app/states/calendarState";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import queryKey from "@/lib/queryKeys";
import { simulateKeyPress } from "@/lib/utils";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const waveSurferInstanceRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { user } = useUser();

  const { selectedDate, setSelectedDate } = useDateStore();
  const queryClient = useQueryClient();


  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      const audioChunks: BlobPart[] = [];
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        (event: BlobEvent) => {
          audioChunks.push(event.data);
        }
      );

      mediaRecorderRef.current.addEventListener("stop", () => {
        // Create a File object from the audio chunks
        const audioFile = new File(audioChunks, "recording.wav", {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioFile);

        setAudioBlob(audioFile); // If you still want to call it audioBlob, you can rename the state accordingly
        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
      });

      setIsRecording(true);
      setTimer(0);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      visualize();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const visualize = () => {
    if (!analyserRef.current || !waveSurferInstanceRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);

    waveSurferInstanceRef.current.loadDecodedBuffer(dataArray);

    animationFrameRef.current = requestAnimationFrame(visualize);
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    } catch (err) {
      console.error("Error stopping the recording:", err);
    }
  };
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="z-50"
      initial={{ height: 0 }}
      animate={{ height: "190px", width: "600px" }}
      exit={{ height: 0, width: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.1,
      }}
      layout
    >
      <motion.div
        className="relative overflow-visible flex flex-col bg-white/50 rounded-[35px] h-[170px] p-4 shadow-lg z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        layout
      >
  

        {!isRecording && !audioUrl && (
          <Button
            className="rounded-3xl h-full text-xl"
            size={"lg"}
            onClick={startRecording}
          >
            <Mic size={30} className="mr-2" />
            Start Recording
          </Button>
        )}
        {isRecording && (
          <div className="flex flex-col w-full h-full">

            <Button
              className="rounded-3xl bg-red-500 hover:bg-red-600 h-full text-xl"
              size={"lg"}
              onClick={stopRecording}
            >
              <StopCircle size={30} className="mr-2" />
              Stop Recording{" "}
              <div className="p-2 ml-2 rounded-full">{formatTime(timer)}</div>
            </Button>
          </div>
        )}
        {audioUrl && !isRecording && (
          <div className="" style={{ width: "100%" }}>
            <WaveSurfer
              onReady={(waveSurfer) =>
                (waveSurferInstanceRef.current = waveSurfer)
              }
              height={60}
              waveColor="#92B7F2"
              progressColor="#3379E3"
              url={audioUrl}
              cursorWidth={0}
              barGap={2}
              barWidth={3}
              barRadius={30}
            />
            <div className="flex flex-row gap-4 h-full pt-4">
              <Button
                className="rounded-3xl h-[60px]  w-full"
                onClick={() => {
                  waveSurferInstanceRef.current?.playPause();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <Pause size={30} className="mr-2" />
                ) : (
                  <Play size={30} className="mr-2" />
                )}
              </Button>

              <Button
                className="rounded-3xl h-[60px] w-full text-xl"
                size={"lg"}
                onClick={async () => {
                  setIsUploading(true);
                  const formData = new FormData();
                  formData.append("file", audioBlob!);
                  formData.append("type", "audio");
                  formData.append("userId", user?.id!);


                  await saveRecording(formData, selectedDate).then(() => {
                    setIsUploading(false);
                    queryClient.invalidateQueries({
                      queryKey: [queryKey.ALL_ENTRIES],
                    });
                    simulateKeyPress("Escape");
                  });
                }}
                disabled={isUploading}
              >
                <UploadCloudIcon size={30} className="mr-2" />
                {isUploading ? "Uploading..." : "Save"}
              </Button>

              <Button
                className="rounded-3xl h-[60px]  w-full text-xl bg-red-500 hover:bg-red-600"
                size={"lg"}
                onClick={deleteRecording}
              >
                <Trash size={30} className="mr-2" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AudioRecorder;
