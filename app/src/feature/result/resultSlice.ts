import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


type Result = {
    name: string
    estimationPoint: number
}

type InitialState = {
    results: Result[]
}

const initialState = {} as InitialState

export const getEstimationsStory = createAsyncThunk(
    "result/getEstimations",
    async (data, {getState}) => {
        const res = await axios.post('http://localhost:4000/api/estimationsstory', {storyId: 1})
        return res.data.results
    }
)

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEstimationsStory.fulfilled, (state, action) => {
            state.results = action.payload
            console.log(action.payload)
        })
    }
})

export const selectResultsStory = (state: { result: { results: Result[]; }; }) => state.result.results

export default resultSlice.reducer
