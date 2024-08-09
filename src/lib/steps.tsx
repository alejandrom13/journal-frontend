import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideArrowUp,
  LucideAudioLines,
  LucideMenu,
  LucidePanelBottomClose,
  LucidePen,
} from "lucide-react";

export const steps: any = [
  // Example steps
  {
    icon: <>👋</>,
    title: "Welcome to Jana AI!",
    content: (
      <>
        Here you have this beautiful carousel that you can use to select the day
        you want to see the data for.
        <div className="flex flex-col gap-3 pt-4">
          <div className="flex flex-row gap-2 ">
            <LucideArrowLeft size={24} className="text-primary" />
            <p>
              <b>Left Arrow</b> for previous day
            </p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LucideArrowRight size={24} className="text-primary" />
            <p>
              <b>Right Arrow</b> for next day
            </p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LucideArrowUp size={24} className="text-primary" />
            <p>
              <b>Up Arrow</b> for current day
            </p>
          </div>
        </div>
      </>
    ),
    selector: "#onborda-step1",
    side: "bottom",
    showControls: false,
    pointerPadding: 0,
    pointerRadius: 24,
  },
  {
    icon: <>📆</>,
    title: "Calendar Picker!",
    content: (
      <>
        Here is the Calendar Picker! Where you can select the specific date you
        want.
      </>
    ),
    selector: "#onborda-step2",
    side: "bottom",
    showControls: true,

    pointerRadius: 34,
  },
  {
    icon: <>🪄</>,
    title: "The Command Bar!",
    content: (
      <>
        This is where the magic happens! <br />
        <br />
        <b>The Command Bar</b> is where you can create notes, record audio, and
        access the menu!
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-row gap-2 ">
            <LucidePen size={24} className="text-primary" />
            <p>
              Press <b>N</b> for New Note
            </p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LucideAudioLines size={24} className="text-primary" />
            <p>
              Press <b>A</b> for New Recording
            </p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LucideMenu size={24} className="text-primary" />
            <p>
              Press <b>M</b> for more options
            </p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LucidePanelBottomClose size={24} className="text-primary" />
            <p>
              Press <b>Esc</b> to close
            </p>
          </div>
        </div>
      </>
    ),
    selector: "#onborda-step3",
    side: "top",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 50,
  },
];
