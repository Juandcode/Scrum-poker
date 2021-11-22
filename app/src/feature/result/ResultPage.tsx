import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../home/homeSlice";
import {selectEstimationValue, selectIdStory} from "../story/storySlice";
import {getEstimationsStory, selectResultsStory} from "./resultSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";

export const ResultPage = () => {
    const dispatch = useDispatch()
    const estimationValue = useSelector(selectEstimationValue)
    const resultsEstimationStory = useSelector(selectResultsStory)
    const storyId = useSelector(selectIdStory)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getEstimationsStory())
    }, [])
    if (!storyId || !estimationValue) return <Navigate to={'/'}/>
    return (
        <div
            className={'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full h-full h-full h-screen flex items-center justify-center flex-row overflow-auto'}>
            {resultsEstimationStory && resultsEstimationStory.length > 0 && resultsEstimationStory.map((e, key) =>
                <div key={key} className={'flex items-center flex-col'}>
                    <p className={'font-body font-bold'}>{e.name}</p>
                    <div
                        className={'w-32 h-40 bg-white rounded-2xl flex items-center justify-center m-2 transition-colors duration-500 ease-in-out hover:bg-blue-700'}>
                        <p className={'font-body font-bold'}>{e.estimationPoint}</p>
                    </div>
                </div>)}
        </div>
    )
}
