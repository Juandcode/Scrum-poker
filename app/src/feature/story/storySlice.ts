import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

export type estimation = {
    estimation: {
        id: number
        value: number
    }
}
type propsStory = {
    title: string
    id: number
    storyEstimation: estimation[]
    estimationValue: number
}

const initialState = {} as propsStory

export const getStory = createAsyncThunk(
    "story/get",
    async ({idUser, roomId, username}: { idUser: number, roomId: number, username: string }, {getState}) => {
        console.log(getState())
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/story`, {idUser: 1, roomId: 1, username}, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        return res.data
    }
)
export const setEstimateStory = createAsyncThunk(
    "story/setEstimate",
    async ({
               name,
               estimationPoint,
               storyId,
               userId
           }: { name: string, estimationPoint: number, storyId: number, userId: number }) => {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/setEstimation`, {
            name,
            estimationPoint,
            storyId,
            userId
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        return response.data.result
    })

export const storySlice = createSlice({
    name: "story",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStory.pending, (state, action) => {

        })
        builder.addCase(getStory.fulfilled, (state, action) => {
            state.id = action.payload.story.id
            state.title = action.payload.story.title
            state.storyEstimation = action.payload.story.StoryEstimation
            state.estimationValue = action.payload.estimateValueVoted
            console.log(state.estimationValue)
            console.log(action.payload)
        })
        builder.addCase(setEstimateStory.fulfilled, (state, action) => {
            state.estimationValue = action.payload.estimationPoint
            //console.log(state)
        })
    }
})
export const selectStoryEstimations = (state: { story: { storyEstimation: estimation[] }; }) => state.story.storyEstimation
export const selectTitle = (state: { story: { title: string; }; }) => state.story.title
export const selectIdStory = (state: { story: { id: number; }; }) => state.story.id
export const selectEstimationValue = (state: { story: { estimationValue: number; }; }) => state.story.estimationValue

export default storySlice.reducer;
