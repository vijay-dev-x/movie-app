import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navigation } from "../constant/navdata";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  //   serch handler
  const searchHandler = (e) => {
    e.preventDefault();
    setSearch("");
  };
  useEffect(() => {
    if (search) {
      navigate(`/search?q=${search}`);
    } else {
      navigate("/");
    }
  }, [search]);
  return (
    <div className=" bg-neutral-700/90 backdrop-blur-lg shadow-lg px-5 flex items-center gap-10">
      <div>
        <Link to={"/"}>
          <img src="/logo.png" className=" h-16 w-50 " alt="" />
        </Link>
      </div>
      <div className=" hidden lg:flex gap-5 px-5 ">
        {navigation.map((value, index) => (
          <div key={index} className={` hover:text-white `}>
            <NavLink
              className={({ isActive }) =>
                `${isActive && " text-white font-bold"}`
              }
              to={value.href}
            >
              {value.label}
            </NavLink>
          </div>
        ))}
      </div>
      <div className=" ml-auto flex gap-5">
        <form onSubmit={searchHandler} className=" hidden lg:flex px-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here.."
            className=" border-none outline-none w-50 py-1 bg-transparent text-white"
            type="text"
          />
          <button type="submit">
            <Search></Search>
          </button>
        </form>
        <img
          src="/user2.png"
          className=" size-10 active:scale-50 transition-all"
          alt="user img"
        />
      </div>
    </div>
  );
}
