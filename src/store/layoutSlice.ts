import { createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  headerShown: boolean;
  footerShown: boolean;
  circularNavShown: boolean;
  getStartedAsShown: boolean;
}

const initialState: LayoutState = {
  headerShown: true,
  footerShown: true,
  circularNavShown: true,
  getStartedAsShown: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    showHeader: (state) => {
      state.headerShown = true;
    },
    hideHeader: (state) => {
      state.headerShown = false;
    },
    showFooter: (state) => {
      state.footerShown = true;
    },
    hideFooter: (state) => {
      state.footerShown = false;
    },
    showCircularNav: (state) => {
      state.circularNavShown = true;
    },
    hideCircularNav: (state) => {
      state.circularNavShown = false;
    },
    showGetStartedAs: (state) => {
      state.getStartedAsShown = true;
    },
    hideGetStartedAs: (state) => {
      state.getStartedAsShown = false;
    },
  },
});

export const {
  showHeader,
  hideHeader,
  showFooter,
  hideFooter,
  showCircularNav,
  hideCircularNav,
  showGetStartedAs,
  hideGetStartedAs,
} = layoutSlice.actions;
export default layoutSlice.reducer;
