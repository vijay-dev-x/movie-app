import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import SearchPage from "./components/SearchPage.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import Explore from "./components/Explore.jsx";
import Details from "./components/Details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/:catagory",
        element: <Explore></Explore>,
      },
      {
        path: "/:catagory/:id",
        element: <Details></Details>,
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
]);
// set up axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_READ_ACCESS_TOKEN
}`;
// redux setup----

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
