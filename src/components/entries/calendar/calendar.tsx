import { CalendarIcon, StickyNote } from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Editor from "@/components/editor/editor";
import { OutputData } from "@editorjs/editorjs";
import { motion } from "framer-motion";

const CalendarCard = ({ entry, index }: any) => {
  const [event, setEvent] = useState<any>();

  useEffect(() => {
    if (entry) {
      setEvent(entry);
    }
  }, [entry]);

  return (
    <motion.div
      className="w-full bg-white/40 p-4 rounded-3xl transition-all ease-in flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear", delay: index * 0.05 }}
    >
      {" "}
      <div className="flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="#3379E3"
        >
          <path d="M0,19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm17-4.5A1.5,1.5,0,1,1,15.5,16,1.5,1.5,0,0,1,17,14.5Zm-5,0A1.5,1.5,0,1,1,10.5,16,1.5,1.5,0,0,1,12,14.5Zm-5,0A1.5,1.5,0,1,1,5.5,16,1.5,1.5,0,0,1,7,14.5Z" />
          <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V8H24V7A5.006,5.006,0,0,0,19,2Z" />
        </svg>
        <div className="text-sm font-semibold text-primary pl-2">
          Calendar
        </div>
      </div>
      <div className="pt-4"></div>
      <div className=" bg-white/50 rounded-xl p-4 hover:bg-white/80 cursor-pointer transition h-full flex flex-row items-center">
        <div className="flex flex-col w-full">
          <div className="text-sm font-semibold ">{event?.content.summary}</div>

          <div className="pt-2">
            <div className="text-sm text-black/60">
              {moment(event?.content.start.dateTime).format(
                "MMMM DD YYYY, h:mm a"
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(editorData.blocks)}</pre> */}
      {/* <span className="text-sm text-black/40">
        {moment(entry?.created_at).format("MMMM DD YYYY, h:mm a")}
      </span> */}
    </motion.div>
  );
};

export default CalendarCard;

// {
//     id: '84qjge9m74r36b9l88pj8b9k74r30b9o852j8b9i64r3id1o8gok8gq48o_20240731T000000Z',
//     type: 'calendar',
//     content: { summary: 'Dinner', start: [Object], end: [Object] },
//     createdAt: '2024-04-25T04:57:19.000Z',
//     updatedAt: '2024-04-25T04:58:43.803Z'
//   }
