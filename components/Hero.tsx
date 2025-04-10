import { Fugaz_One } from "next/font/google";
import React from "react";
import Button from "./Button";
import Calender from "./Calender";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 md:gap-8">
      <h1 className={"text-center text-3xl md:text-7xl " + fugaz.className}>
        <span className="bg-gradient-to-r from-purple-500 to-violet-400  bg-clip-text text-transparent mr-2">
          Moodify
        </span>
        helps you track your
        <span className="bg-gradient-to-r from-purple-500 to-violet-400  bg-clip-text text-transparent ml-2 mr-2">
          daily
        </span>
        mood!
      </h1>
      <p className=" text-xl md:text-2xl text-center w-full mx-auto max-w-[600px] ">
        Create your mood record and see how you feel on
        <span className="ml-2 font-semibold ">every day of the year</span>
      </p>

      <CallToAction />
      <Calender demo />
    </div>
  );
};

export default Hero;
