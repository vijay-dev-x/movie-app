import React from "react";
import moment from "moment";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Card({ value, index, type, tranding }) {
  const baseUrl = useSelector((store) => store.app.baseUrl);
  const navigate = useNavigate();

  const movieIdHandler = (value) => {
    console.log("first");
    navigate(`/${type}/${value.id}`);
  };
  return (
    <div>
      <div
        onClick={() => movieIdHandler(value)}
        className=" z-30 hover:scale-105 overflow-hidden relative cursor-pointer transition-all h-full w-full"
      >
        {value.poster_path ? (
          <img
            className=" min-w-[200px] max-w-full h-full"
            src={baseUrl + value.poster_path}
            alt="banner"
          />
        ) : (
          <div className=" flex justify-center h-full w-full items-center">
            <h2>Image not found!</h2>
          </div>
        )}
        {tranding && (
          <div className="backdrop-blur-sm bg-black/50 rounded-r-full p-2 absolute top-2 font-semibold">
            <p>#{index + 1} Trending</p>
          </div>
        )}
        <div className="p-2 absolute bottom-0 h-16 w-full backdrop-blur-sm bg-black/60 overflow-hidden left-0">
          <h2 className="text-lg font-bold whitespace-nowrap">
            {value.original_title || value.original_name}
          </h2>
          <div className="flex justify-between">
            <p className="text-white/60">
              {moment(value.release_date).format("MMM Do YY")}
            </p>
            <p>Rating: {Number(value.vote_average).toFixed(1)}+</p>
          </div>
        </div>
        \
      </div>
    </div>
  );
}
