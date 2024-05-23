import { CircleX, Cross, LucideCross } from "lucide-react";
import React from "react";

export default function PlayVidio({ setIsPlay, trailerData }) {
  //   console.log("trailer data", trailerData.key);
  return (
    <div className=" fixed h-full flex justify-center items-center w-full bg-gray-800/60 top-0">
      <div className=" rounded-md relative bg-black max-w-[900px] w-[80%] h-[70%]">
        <button
          onClick={() => setIsPlay(false)}
          className=" -mt-8 -mr-5 hover:scale-110 transition-all absolute right-0 "
        >
          <CircleX size={40}></CircleX>
        </button>
        <iframe
          className=" h-full w-full"
          src={`https://www.youtube.com/embed/${trailerData.key}?si=csdXXgjmQBV5FxK3`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
