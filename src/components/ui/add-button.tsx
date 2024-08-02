import { AnimatePresence, motion } from "framer-motion";
import { AudioLinesIcon, Pen, Plus } from "lucide-react";
import { buttonVariants, Button } from "./button";
import { useState } from "react";

const AddButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 500,
        damping: 24,
      },
    }),
    exit: { opacity: 0, y: 20, scale: 0.8 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-[50%] transform -translate-x-1/2 mb-10">
        <div className="relative">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-24 z-10 left-1/2 transform -translate-x-1/2 space-y-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                {[
                  {
                    icon: <AudioLinesIcon size={20} />,
                    name: "Voice Note",
                    onClick: () => {},
                  },
                  {
                    icon: <Pen size={20} />,
                    name: "Note",
                    onClick: () => {},
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={buttonVariants}
                    custom={index}
                    className="flex flex-col gap-4 items-center"
                  >
                    <Button
                      variant={"ghost"}
                      className={`rounded-full h-12 gap-3 text-[#3379E3] bg-white duration-200 transition-all`}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Button
              className={`rounded-full h-[70px] w-[70px] bg-[#3379E3] hover:bg-[#3e75c8] transition-all duration-200
  ${isExpanded ? "shadow-[0_16px_100px_150px_rgba(255,255,255,0.53)]" : ""}
`}
              onClick={toggleExpand}
            >
              <Plus size={32} />
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AddButton;
