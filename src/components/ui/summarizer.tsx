import { WandSparkles, ChevronDown } from "lucide-react";
import React, { useState } from "react";

const SummarizerComponent = () => {
  const [open, setOpen] = useState(false);

  const songsListened = [
    {
      name: "Adele",
    },
    {
      name: "Adele",
    },
    {
      name: "Adele",
    },
    {
      name: "Adele",
    },
    {
      name: "Adele",
    },
  ];

  return (
    <div className="w-full bg-white/40 p-4 rounded-3xl transition-all ease-in">
      <div
        className="w-full bg-white/60 h-16 rounded-xl flex flex-row items-center p-4 cursor-pointer hover:bg-white transition-all"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
      >
        <div className="flex flex-row gap-4 items-center">
          <WandSparkles size={24} className={`text-[#3379E3]`} />
          <h6 className="text-md font-medium text-[#3379E3]">Summarized</h6>
        </div>

        <div className="ml-auto">
          <ChevronDown
            size={24}
            className={`text-slate-800  ${
              open ? "rotate-180" : ""
            }  transition-transform duration-300`}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="">
          <h4 className="text-lg pt-4">
            You had <span className="font-semibold">2 Events</span>
          </h4>
          <div className="flex flex-row gap-4 pt-2">
            <div className="w-48 p-3 rounded-lg bg-green-600 text-white">
              <p>KickOff the week: AlterEstate</p>
            </div>
            <div className="w-48 p-3 rounded-lg bg-slate-400 text-white">
              <p>Lunch</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h4 className="text-lg pt-4">
            You listened to music for over{" "}
            <span className="font-semibold">2 Hours</span>
          </h4>
          <div className="pt-2"></div>
          <div className="w-full p-3 rounded-lg  text-black">
            <div className="flex flex-row gap-4">
              {songsListened.map((e: any) => {
                return (
                  <>
                    <div className="h-16 w-16 bg-slate-500 rounded-md"></div>
                  </>
                );
              })}
            </div>
          </div>
          <h4 className="text-lg pt-4">
            You spent most of your time at
            <span className="font-semibold"> Home</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SummarizerComponent;
