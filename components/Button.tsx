import { Fugaz_One } from "next/font/google";
import React from "react";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Button = (props: any) => {
  const { text, dark, full, clickHandler } = props;

  return (
    <div>
      <button
        onClick={clickHandler}
        className={` rounded-full hover:opacity-60 cursor-pointer duration-200 border-2 border-solid border-indigo-600 ${
          dark ? "text-white bg-indigo-600 " : "text-indigo-600"
        } ${full ? "w-full flex justify-center items-center" : ""}`}
      >
        <p className={` px-10 whitespace-nowrap py-3  ${fugaz.className}`}>
          {text}
        </p>
      </button>
    </div>
  );
};

export default Button;
