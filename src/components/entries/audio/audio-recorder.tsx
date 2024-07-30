import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import { useWavesurfer } from "@wavesurfer/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { container } from "googleapis/build/src/apis/container";
import { Mic, Pause, Play, Save, StopCircle, Trash, UploadCloudIcon } from "lucide-react";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const waveSurferInstanceRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
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
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
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

  const saveRecording = async () => {
    // ... (same as before)
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
  }

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
        className="flex flex-col bg-white/50 rounded-[35px] h-[170px] p-4 shadow-lg z-30"
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
            {/* <WaveSurfer
              onReady={(waveSurfer) =>
                (waveSurferInstanceRef.current = waveSurfer)
              }
              height={50}
              waveColor="rgb(200, 0, 200)"
              progressColor="rgb(100, 0, 100)"
              cursorWidth={0}
              barGap={2}
              barWidth={2}
              barRadius={30}
            /> */}
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
                {
                  isPlaying ? (
                    <Pause size={30} className="mr-2" />
                  ) : (
                    <Play size={30} className="mr-2" />
                  )
                }
              </Button>
              <Button className="rounded-3xl h-[60px] w-full text-xl" size={'lg'}  onClick={saveRecording}>
               <UploadCloudIcon size={30} className="mr-2" />
                Save Recording
              </Button>

              <Button className="rounded-3xl h-[60px]  w-full text-xl bg-red-500 hover:bg-red-600" size={'lg'}  onClick={deleteRecording}>
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
