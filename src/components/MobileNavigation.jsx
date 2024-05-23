import { NavLink } from "react-router-dom";
import { mobileNavigationData } from "../constant/navdata";

export default function MobileNavigation() {
  return (
    <div className=" z-20 fixed overflow-hidden bottom-0 bg-zinc-800 mt-10 w-[100%] p-2 ">
      <div className=" flex justify-between">
        {mobileNavigationData.map((value, index) => (
          <NavLink
            to={value.href}
            key={index}
            className={({ isActive }) =>
              `() flex flex-col gap-1 justify-center items-center ${
                isActive && " font-bold text-white"
              }`
            }
          >
            <p>{value.icon}</p>

            <p>{value.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
