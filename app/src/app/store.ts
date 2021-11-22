import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "../feature/home/homeSlice";
import storyReducer from "../feature/story/storySlice";
import resultSlice from "../feature/result/resultSlice";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        home: homeReducer,
        story: storyReducer,
        result: resultSlice
    }
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
