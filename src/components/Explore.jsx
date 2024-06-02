import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

export default function Explore() {
  let { catagory } = useParams();
  const [pageno, setPageno] = useState(1);
  const [exploreData, setExploreData] = useState([]);

  if (catagory === "movies") {
    catagory = "movie";
  }
  console.log(catagory);
  //   fetch data
  const fetchExproreData = async () => {
    try {
      const res = await axios.get(`/discover/${catagory}`, {
        params: {
          page: pageno,
        },
      });
      setExploreData(res.data.results);
      console.log("fetching from explore", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const priviousHandler = () => {
    if (pageno > 0) {
      setPageno(pageno - 1);
    }
  };
  const nextHandler = () => {
    setPageno(pageno + 1);
  };
  console.log("exploreData", exploreData);
  //   use effect

  useEffect(() => {
    fetchExproreData();
  }, [pageno, catagory]);
  return (
    <div className=" p-5 container mx-auto">
      <h1 className=" text-xl md:text-3xl font-bold mb-8">
        Explore your {catagory === "tv" ? "TV shows" : "Movies"}{" "}
      </h1>
      <div className=" justify-center mx-auto grid grid-cols-[repeat(auto-fit,150px)] md:grid-cols-[repeat(auto-fit,230px)] gap-5">
        {exploreData?.map((value, index) => (
          <Card
            key={index}
            tranding={false}
            type={catagory}
            index={index}
            value={value}
          ></Card>
        ))}
      </div>
      <div className=" flex justify-center gap-5 my-2 mb-16 md:mb-2 w-[100%] p-3 ">
        <button onClick={priviousHandler}>Previous</button>
        <p>{pageno}</p>
        <button onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
}
