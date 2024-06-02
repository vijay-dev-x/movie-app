import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Card from "./Card";
import PlayVidio from "./PlayVidio";

export default function Details() {
  const { id } = useParams();
  const { catagory } = useParams();
  const [details, setDetails] = useState("");
  const [castDetails, setCastDetails] = useState([]);
  const [similerDetails, setSimilarDetails] = useState([]);
  const [recommandaitionDetails, setRecommandaitionDetails] = useState([]);
  const [trailerData, setTrailerData] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const baseUrl = useSelector((store) => store.app.baseUrl);

  //   fetch api
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`/${catagory}/${id}`);
      setDetails(res.data);
      // console.log("movie/tv details", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchCastDetails = async () => {
    try {
      const res = await axios.get(`/${catagory}/${id}/credits`);
      setCastDetails(res.data);
      // console.log("cast details", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchSimilarDetails = async () => {
    try {
      const res = await axios.get(`/${catagory}/${id}/similar`);
      setSimilarDetails(res.data.results);
      // console.log("similar details", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchRecommandaitionDetails = async () => {
    try {
      const res = await axios.get(`/${catagory}/${id}/similar`);
      setRecommandaitionDetails(res.data.results);
      // console.log("recommandation details", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchTrailerData = async () => {
    try {
      const res = await axios.get(`/${catagory}/${id}/videos`);
      setTrailerData(res.data.results[0]);
    } catch (error) {
      console.log("error", error);
    }
  };
  //   functions--
  const convertRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  //   use effect
  useEffect(() => {
    fetchDetails();
    fetchCastDetails();
    fetchSimilarDetails();
    fetchRecommandaitionDetails();
    fetchTrailerData();
  }, [id]);
  console.log(similerDetails);
  return (
    <div>
      <div className=" pb-[5em]">
        <div className=" relative w-full ">
          <img
            className=" h-[400px] w-full object-cover"
            src={baseUrl + details?.backdrop_path}
            alt=""
          />
          <div className=" absolute top-0 bg-gradient-to-t from-neutral-900 to-transparent h-full w-full"></div>
        </div>
        <div className=" flex-col md:flex-row flex gap-10 items-center relative -mt-36 p-5 w-full h-full">
          <div className=" w-full min-w-[200px] max-w-[280px] ">
            <img
              className=" w-[80%] mx-auto md:w-[100%] rounded-md "
              src={baseUrl + details?.poster_path}
              alt="poster img"
            />
            <button
              onClick={() => setIsPlay(!isPlay)}
              className=" hover:bg-black hover:text-white transition-all w-full my-2 rounded py-2  text-xl font-bold bg-white text-black"
            >
              Play trailer
            </button>
          </div>
          <div className="flex mx-0 flex-col gap-1">
            <h2 className=" text-4xl font-extrabold ">
              {details?.title || details?.original_name}
            </h2>
            <p className=" text-white/60 text-xl">{details?.tagline}</p>
            <div className=" flex gap-3">
              <p className="  text-sm  ">
                Rating: {Number(details?.vote_average).toFixed(1)}
              </p>
              <span>|</span>
              <p className="  text-sm ">
                Views: {Number(details?.popularity).toFixed(0)}
              </p>
              <span>|</span>

              <p className="  text-sm ">
                Duration: {convertRuntime(details?.runtime)}
              </p>
            </div>
            <div className=" border-[0.5px] border-white/20"></div>

            <div>
              <h1 className=" text-2xl font-bold">Overview</h1>
              <p>{details?.overview}</p>
            </div>
            <div className=" border-[0.5px] border-white/20"></div>
            <div className=" flex gap-2 my-2">
              <p className="  text-sm ">
                Budget: {Number(details?.budget / 1000000).toFixed(0)} Million
              </p>
              <span>|</span>
              <p className="  text-sm ">
                Revanue: {Number(details?.revenue / 1000000).toFixed(0)} Million
              </p>
            </div>
          </div>
        </div>
        <div className=" p-5">
          <h1 className=" text-3xl font-bold my-1 text-center">Star cast</h1>
          <div className=" grid grid-cols-[repeat(auto-fit,90px)] md:grid-cols-[repeat(auto-fit,128px)] gap-5  justify-center p-3">
            {castDetails?.cast
              ?.filter((avl) => avl.profile_path)
              .map((value, index) => (
                <div
                  className=" flex flex-col gap-2 justify-center "
                  key={index}
                >
                  <div className=" md:size-32 size-20">
                    <img
                      className=" w-full h-full rounded-full object-cover"
                      src={baseUrl + value.profile_path}
                      alt="logo"
                    />
                  </div>
                  <p className="   text-center">{value.name}</p>
                </div>
              ))}
          </div>
        </div>

        <div>
          <MovieCard
            catagory={"Recommandations"}
            movieData={recommandaitionDetails}
            type={catagory}
          ></MovieCard>
          <MovieCard
            catagory={"Similars"}
            movieData={similerDetails}
            type={catagory}
          ></MovieCard>
        </div>
        <div>
          {isPlay && (
            <PlayVidio
              trailerData={trailerData}
              setIsPlay={setIsPlay}
              type={catagory}
            ></PlayVidio>
          )}
        </div>
      </div>
    </div>
  );
}
