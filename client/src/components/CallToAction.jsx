import React from "react";
import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col md:flex-row mb-6 gap-8">
      <div className="flex flex-col justify-center gap-2 2xl:gap-4 text-center md:text-start">
        <h2 className="font-semibold text-2xl sm:text-4xl 2xl:text-5xl text-white">
          Overwhelmed by Long Reads?
        </h2>
        <p className="text-sm sm:text-lg 2xl:text-2xl text-stone-400">
          Use our AI summarizer to turn detailed articles into easy-to-read
          summaries. Perfect for skimming through information fast!
        </p>

        <a
          className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
           focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium
           rounded-lg text-sm sm:text-xl 2xl:text-3xl px-5 py-2.5 text-center me-2 mb-2"
          href="https://sumz-ai-article.vercel.app/"
          target="_blank"
        >
          SumzAI
        </a>
      </div>
      <div className="hidden md:block">
        <img
          className="rounded-full max-w-full m-auto md:max-w-[75%]"
          src="/SumzAI.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
