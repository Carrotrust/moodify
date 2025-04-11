"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import { useAuth } from "@/context/authContext";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";

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

const Dashboard = () => {
  const [data, setData] = useState<MoodData | null>(null);

  const auth = useAuth();

  if (!auth) {
    return <Loading />;
  }
  const { currentUser, userDataObject, setUserDataObject, loading } = auth;

  useEffect(() => {
    if (!currentUser || !userDataObject) {
      return;
    }

    setData(userDataObject);
  }, [currentUser, userDataObject]);

  const now = new Date();

  const countValues = () => {
    let totalNumberOfDays = 0;
    let sumMoods = 0;
    for (const year in data) {
      // Cast the year to a number
      const numYear = Number(year);

      for (const month in data[numYear]) {
        // Cast the month to a number
        const numMonth = Number(month);

        for (const day in data[numYear][numMonth]) {
          // Cast the day to a number
          const numDay = Number(day);

          const daysMood = data[numYear][numMonth][numDay];
          totalNumberOfDays++;
          sumMoods += parseInt(daysMood);
        }
      }
    }
    return {
      numDays: totalNumberOfDays,
      averageMood: sumMoods / totalNumberOfDays,
    };
  };

  const statuses: Record<string, string | number> = {
    ...countValues(),
    timeRemaining: `${23 - now.getHours()}H  ${60 - now.getMinutes()}M`,
  };
  const handleUpdate = async (mood: string | number) => {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    try {
      const newData = { ...userDataObject };
      if (!newData?.[year]) {
        newData[year] = {};
      }

      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood as string;
      //update current state
      setData(newData);
      // update global state
      setUserDataObject(newData);
      // update firebase
    } catch (err) {
      console.log(err);
    }
  };

  const moods: Record<string, string> = {
    "&*#@$": "😭",
    "Sad ": "🥲",
    "Existing ": "😶",
    " Good ": "😊",
    " Elated ": "😍",
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-1 px-2 md:px-8 flex-col gap-8 md:gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((stastus, stastusIndex) => {
          return (
            <div key={stastusIndex} className="p-4 flex flex-col gap-2">
              <p className="font-medium text-sm md:text-lg capitalize">
                {stastus}
              </p>
              <p className={`text-lg  ${fugaz.className}`}>
                {statuses[stastus]}
                {stastus === "numDays" ? " 🔥" : ""}
              </p>
            </div>
          );
        })}
      </div>
      <h4 className={` text-3xl md:text-6xl text-center ${fugaz.className}`}>
        How do you
        <span className="ml-2 mr-2 bg-gradient-to-r from-purple-500 to-violet-400  bg-clip-text text-transparent">
          feel
        </span>
        today ?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleUpdate(currentMoodValue);
              }}
              className={`p-4 rounded-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] shadow-md bg-indigo-50 cursor-pointer hover:bg-[lavender] flex items-center flex-col gap-2 flex-1`}
              key={moodIndex}
            >
              <p className="text-5xl md:text-7xl">{moods[mood]}</p>
              <p
                className={`text-indigo-500 text-sm md:text-base  ${fugaz.className}`}
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calender completeData={data} handleUpdate={handleUpdate} demo={false} />
    </div>
  );
};

export default Dashboard;
