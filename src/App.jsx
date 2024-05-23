import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBannerData, setBaseUrl } from "./redux/movieSlice";

export default function App() {
  const dispatch = useDispatch();

  // fetch tranding data
  const fetchTrandingData = async () => {
    try {
      const res = await axios.get("/trending/movie/week");
      dispatch(setBannerData(res.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };
  // fetch base url
  const fetchBaseUrl = async () => {
    const res = await axios.get("/configuration");
    dispatch(setBaseUrl(res.data.images.secure_base_url + "original"));
  };
  // use effect----
  useEffect(() => {
    fetchTrandingData();
    fetchBaseUrl();
  }, []);

  return (
    <div className=" flex flex-col justify-between h-[100vh] ">
      <div>
        <Header></Header>
        <Outlet></Outlet>
      </div>
      <div>
        <div className=" lg:block hidden ">
          <Footer></Footer>
        </div>
        <div className=" fixed lg:hidden block bottom-0 w-full">
          <MobileNavigation></MobileNavigation>
        </div>
      </div>
    </div>
  );
}
