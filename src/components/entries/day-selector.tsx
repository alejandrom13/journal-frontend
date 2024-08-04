import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface DayProps {
  day: number;
  dayName: string;
  isSelected: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ day, dayName, isSelected, onClick }) => (
  <div
    className={`flex items-center justify-center w-20 h-24 rounded-full cursor-pointer
        active:scale-90 transition-all ease-in
        ${
          isSelected
            ? "bg-primary text-white"
            : "bg-white/50 hover:bg-white transition-all ease-in"
        }`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-1">
      <span>{dayName}</span>
      <span className="text-2xl">{day}</span>
    </div>
  </div>
);

interface MonthCarouselProps {
  initialDate: Date;
  onChange: (date: Date) => void;
}

const MonthCarousel: React.FC<MonthCarouselProps> = ({
  initialDate,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: true,
    inViewThreshold: 0.7,
  });
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    // Scroll to the selected date when the component mounts
    if (embla) {
      embla.scrollTo(selectedDate.getDate() - 1);
    }
  }, [selectedDate, embla]);

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index - 3),
    [embla]
  );

  const handleDateChange = (day: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    onChange(newDate);
    scrollTo(day - 1);
  };

  return (
    <div className="relative pt-4">

      <div className="overflow-hidden relative select-none" ref={viewportRef}>
        <div className="embla__container flex">
          {days.map((day) => (
            <div key={day} className="embla__slide flex-shrink-0 mx-2">
              <Day
                day={day}
                dayName={new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  day
                ).toLocaleString("default", { weekday: "short" })}
                isSelected={day === selectedDate.getDate()}
                onClick={() => handleDateChange(day)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MonthCarousel;
