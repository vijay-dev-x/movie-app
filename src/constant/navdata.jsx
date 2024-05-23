import { Clapperboard, Home, Search, Tv } from "lucide-react";

export const navigation = [
  {
    label: "Home",
    href: "/",
    icon: <Home></Home>,
  },
  {
    label: "TV shows",
    href: "tv",
    icon: <Tv></Tv>,
  },
  {
    label: "Movies",
    href: "movies",
    icon: <Clapperboard></Clapperboard>,
  },
];
export const mobileNavigationData = [
  ...navigation,
  {
    label: "Search",
    href: "search",
    icon: <Search></Search>,
  },
];
