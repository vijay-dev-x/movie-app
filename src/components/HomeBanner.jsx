import { ArrowLeft, ArrowRight, AxeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomeBanner() {
  const baseUrl = useSelector((store) => store.app.baseUrl);
  const bannerData = useSelector((store) => store.app.bannerData);
  const [currentImg, setCurrentImg] = useState(0);

  const handlePrevious = () => {
    if (currentImg > 0) {
      setCurrentImg(currentImg - 1);
    }
  };

  const handleRight = () => {
    if (currentImg < bannerData.length - 1) {
      setCurrentImg(currentImg + 1);
    }
  };
  console.log("banner data", bannerData);
  //   use effect--

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (currentImg < bannerData.length - 1) {
  //         handleRight();
  //       } else {
  //         setCurrentImg(0);
  //       }
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }, [bannerData, baseUrl]);

  return (
    <div className=" h-full w-full">
      <div className="flex overflow-hidden">
        {bannerData?.map((value, index) => (
          <div
            key={index}
            className=" min-h-full min-w-full relative transition-all"
            style={{ transform: `translateX(-${currentImg * 100}%)` }}
          >
            <div className=" h-[90vh] w-full overflow-hidden ">
              <img
                className=" h-full object-cover w-full"
                src={baseUrl + value.backdrop_path}
                alt="banner"
              />
            </div>
            <div className=" absolute h-full w-full top-0 flex items-center justify-between px-5">
              <button
                onClick={handlePrevious}
                className=" hover:text-white text-white/60 text-[4em] z-40 "
              >
                <ArrowLeft size={30}></ArrowLeft>
              </button>
              <button
                onClick={handleRight}
                className=" hover:text-white text-white/60 text-[4em] z-40 "
              >
                <ArrowRight size={30}></ArrowRight>
              </button>
            </div>
            <div className="  absolute top-0 bg-gradient-to-t from-neutral-900 to-transparent h-full w-full "></div>
            <div className=" absolute w-[60%] p-5 bottom-10">
              <h2 className=" text-4xl  font-bold my-2">{value.title}</h2>
              <p className=" text-ellipsis  line-clamp-3">{value.overview}</p>
              <div className=" cursor-pointer z-50 flex gap-2 my-2">
                <p>Rating: {Number(value.vote_average).toFixed(1)}+</p>
                <span>|</span>
                <p>Views: {Number(value.vote_count).toFixed(0)}+</p>
              </div>
              <Link to={`/${value.media_type}/${value.id}`}>
                <button className=" z-60 cursor-pointer hover:bg-gradient-to-tr from-red-600 to-orange-400 transition-all hover:text-white bg-white text-black font-semibold text-lg rounded-md py-2 px-5 mt-2">
                  Play now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
