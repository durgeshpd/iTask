import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import appSlice from "./appSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    app: appSlice,
    theme: themeReducer,
  },
});

export default store;
