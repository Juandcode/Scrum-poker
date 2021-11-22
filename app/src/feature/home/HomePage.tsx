import React, {ReactElement, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectLoading, selectUsername} from "./homeSlice";
import {useNavigate, Navigate} from "react-router-dom";
import {login} from "./homeSlice";
import {useAppDispatch} from "../../app/store";
import {unwrapResult} from "@reduxjs/toolkit";

export const HomePage = (): ReactElement => {
    const dispatch = useAppDispatch();
    const username = useSelector(selectUsername)
    const loading = useSelector(selectLoading)
    const [name, setName] = useState("")
    const [roomId, setRoomId] = useState<number>(0)
    const navigate = useNavigate()

    const goToStory = async () => {
        try {
            const data = await dispatch(login({name, roomId}))
            console.log(unwrapResult(data))
        } catch (e) {
            console.log(e)
        }
    }
    if (username) return <Navigate to={'/story'}/>
    return (
        <div
            className={'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full h-full h-full h-screen flex items-center justify-center flex-col'}>
            <input onChange={(e) => setName(e.target.value)} placeholder={'Name'}
                   className={'w-52 h-9 rounded-full my-2 pl-2 font-body font-bold'}/>
            <input type={'number'} onChange={(e) => setRoomId(parseInt(e.target.value))} placeholder={'Room ID'}
                   className={'w-52 h-9 rounded-full my-2 p-2 font-body font-bold'}/>
            {!loading &&
            <button onClick={goToStory} className={'bg-blue-600 rounded-full py-2 px-6 my-2'}><p
                className={'font-body font-bold'}>Go</p></button>}
        </div>
    )
}
