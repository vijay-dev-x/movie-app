import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bannerData: [],
  baseUrl: "",
};
export const movieSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
  },
});
export const { setBannerData, setBaseUrl } = movieSlice.actions;
export default movieSlice.reducer;
