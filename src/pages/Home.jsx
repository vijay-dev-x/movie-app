import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Loader2Icon } from "lucide-react";

export default function Home() {
  const bannerData = useSelector((store) => store.app.bannerData);
  const [seriesData, setSeriesData] = useState([]);
  const [popularData, setpopularData] = useState([]);
  const [topRatedData, setTopRaedtedData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeriesData = async () => {
    try {
      const res = await axios.get("/tv/popular");
      console.log("tv shows", res.data);
      setSeriesData(res.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchPopularData = async () => {
    try {
      const res = await axios.get("/movie/popular");
      setpopularData(res.data.results);
    } catch (error) {
      console.log("err", error);
    }
  };
  const fetchTopRated = async () => {
    try {
      const res = await axios.get("/movie/top_rated");
      setTopRaedtedData(res.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchUpcoming = async () => {
    try {
      const res = await axios.get("/movie/upcoming");
      setUpcomingData(res.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    fetchSeriesData();
    fetchTopRated();
    fetchPopularData();
    fetchUpcoming();
    return () => clearInterval(timeout);
  }, []);
  return (
    <div className="">
      {!loading ? (
        <div className=" overflow-hidden">
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
      ) : (
        <div className=" h-[80vh] w-full flex justify-center items-center ">
          <Loader size={40} className="  animate-spin"></Loader>
        </div>
      )}
    </div>
  );
}
