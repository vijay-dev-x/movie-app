import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const bannerData = useSelector((store) => store.app.bannerData);
  const [seriesData, setSeriesData] = useState([]);
  const [popularData, setpopularData] = useState([]);
  const [topRatedData, setTopRaedtedData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);

  const fetchSeriesData = async () => {
    const res = await axios.get("/tv/popular");
    console.log("tv shows", res.data);
    setSeriesData(res.data.results);
  };
  const fetchPopularData = async () => {
    const res = await axios.get("/movie/popular");
    setpopularData(res.data.results);
  };
  const fetchTopRated = async () => {
    const res = await axios.get("/movie/top_rated");
    setTopRaedtedData(res.data.results);
  };
  const fetchUpcoming = async () => {
    const res = await axios.get("/movie/upcoming");
    setUpcomingData(res.data.results);
  };
  useEffect(() => {
    fetchSeriesData();
    fetchTopRated();
    fetchPopularData();
    fetchUpcoming();
  }, []);
  return (
    <div className="">
      <HomeBanner></HomeBanner>
      <MovieCard
        catagory={"Trending"}
        type={"movie"}
        tranding={true}
        movieData={bannerData}
      ></MovieCard>
      <MovieCard
        catagory={"TV shows"}
        type={"tv"}
        tranding={false}
        movieData={seriesData}
      ></MovieCard>
      <MovieCard
        catagory={"Top rated"}
        type={"movie"}
        tranding={false}
        movieData={topRatedData}
      ></MovieCard>
      <MovieCard
        catagory={"Popular"}
        type={"movie"}
        tranding={false}
        movieData={popularData}
      ></MovieCard>
      <MovieCard
        catagory={"Upcoming"}
        type={"movie"}
        tranding={false}
        movieData={upcomingData}
      ></MovieCard>
    </div>
  );
}
