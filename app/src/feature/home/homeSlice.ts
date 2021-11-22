import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

type initialProps = {
    username: string
    userId: number
    roomId: number
    loading: boolean
    error: boolean
}

const initialState = {loading: false, error: false} as initialProps;

export const login = createAsyncThunk(
    "home/login",
    async ({name, roomId}: { name: string, roomId: number }, {getState}) => {
        //console.log(getState())
        //console.log(selectLoading(getState() as { home: { loading: boolean; } }))
        const response = await axios.post('http://localhost:4000/api/login', {username: name, roomId: roomId}, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        return response.data;
    }
)

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.username = action.payload.user.name
            state.userId = action.payload.user.id
            state.roomId = action.payload.roomId
            state.loading = false
            state.error = false
            console.log(action.payload);
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log(action)
            state.loading = false
        })
    }
})

export const selectUsername = (state: { home: { username: string; }; }) => state.home.username
export const selectLoading = (state: { home: { loading: boolean; }; }) => state.home.loading
export const selectUserId = (state: { home: { userId: number; }; }) => state.home.userId
export const selectRoomId = (state: { home: { roomId: number; }; }) => state.home.roomId
export default homeSlice.reducer;
