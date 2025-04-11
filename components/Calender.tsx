"use client";
import React, { useState } from "react";
import { gradients, baseRating } from "@/utils/index";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

type MoodData = {
  [year: number]: {
    [month: number]: {
      [day: number]: string;
    };
  };
};

interface CalendarProps {
  demo: boolean;
  completeData: MoodData | null;
  handleUpdate?: (mood: string | number) => Promise<void>;
}

const Calender = (props: CalendarProps) => {
  const { demo, completeData } = props;

  const months = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sept",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  const monthsArr = Object.keys(months);

  const now = new Date();

  const currentMonth = now.getMonth();

  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth];

  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const year = 2025;
  // const month = "April";
  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const increaseVal = (val: number) => {
    if (numericMonth + val < 0) {
      //
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      //
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      //
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-3 gap-4 ">
        <button
          onClick={() => {
            increaseVal(-1);
          }}
          className="cursor-pointer hover:opacity-60 text-indigo-400 mr-auto text-lg md:text-3xl"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={`text-center font-bold text-lg md:text-3xl capitalize bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent ${fugaz.className}`}
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => {
            increaseVal(+1);
          }}
          className="cursor-pointer hover:opacity-60 text-indigo-400 ml-auto text-lg md:text-3xl"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col py-6 md:py-10 overflow-hidden gap-1">
        {[...Array(numRows).keys()].map((rows, rowIndex) => {
          return (
            <div key={rowIndex} className=" gap-1 grid grid-cols-7">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                const dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                const dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : rows === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                const isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div key={dayOfWeekIndex} className="bg-white " />;
                }

                const moodValue =
                  data && dayIndex in data
                    ? parseInt(data[dayIndex])
                    : undefined;

                const color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : moodValue
                  ? gradients.indigo[moodValue]
                  : "white";

                return (
                  <div
                    style={{ background: color }}
                    className={`text-sm border border-solid p-2 gap-4 flex items-center justify-between cursor-pointer rounded-lg ${
                      isToday ? "border-indigo-400" : "border-indigo-100"
                    } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
