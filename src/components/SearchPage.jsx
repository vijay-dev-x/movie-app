import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "./Card";

export default function SearchPage() {
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const query = new URLSearchParams(location.search);
  const [gotRejult, setGotResult] = useState(false);

  const q = query.get("q");
  const navigate = useNavigate();
  const fetchSearchData = async () => {
    try {
      const res = await axios.get(`/search/collection`, {
        params: {
          query: q,
          page: 1,
        },
      });
      setData(res.data.results);
      setGotResult(res.data.results.length > 0 ? true : false);
    } catch (error) {
      console.log("error", error);
      setGotResult(false);
    }
  };
  //   use effect

  useEffect(() => {
    fetchSearchData();
  }, [params, location]);

  console.log(data);
  return (
    <div>
      <div className=" container p-5 mx-auto overflow-hidden">
        <div className=" z-20 md:hidden fixed top-30 left-0 px-2 w-full flex justify-center">
          <input
            className=" z-60 bg-neutral-700 mx-auto w-[100%] bg-white/90 text-black rounded-full outline-none py-2 px-3 "
            onChange={(e) => {
              navigate(`/search?q=${e.target.value}`);
              setGotResult(false);
            }}
            placeholder="Search here.."
            type="text"
          />
        </div>
        <h2 className=" text-xl  md:text-3xl my-6 mt-16 md:mt-0  font-bold">
          {gotRejult ? "From your search.." : "Search Your Movies & Shows"}
        </h2>
        <div className="-z-20  justify-center grid-cols-[repeat(auto-fit,150px)] grid md:grid-cols-[repeat(auto-fit,230px)]  gap-5">
          {data?.map((value, index) => (
            <Card key={index} type={"movie"} index={index} value={value}></Card>
          ))}
        </div>
      </div>
    </div>
  );
}
