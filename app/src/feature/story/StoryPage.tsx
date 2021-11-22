import React, {useEffect} from 'react'
import {unwrapResult} from "@reduxjs/toolkit";
import {useSelector, useDispatch} from "react-redux";
import {selectUsername, selectUserId, selectRoomId} from "../home/homeSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {
    getStory,
    selectStoryEstimations,
    selectTitle,
    selectIdStory,
    setEstimateStory,
    selectEstimationValue,
    estimation
} from "./storySlice";
import {useAppDispatch} from "../../app/store";

export const StoryPage = () => {
    const username = useSelector(selectUsername)
    const idUser = useSelector(selectUserId)
    const roomId = useSelector(selectRoomId)
    const title = useSelector(selectTitle)
    const storyId = useSelector(selectIdStory)
    const storyEstimations = useSelector(selectStoryEstimations)
    const estimateValueVoted = useSelector(selectEstimationValue)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToResultPage = () => {
        navigate('/result')
    }
    const setEstimate = (points: number) => async () => {
        try {
            dispatch(setEstimateStory({
                name: username,
                estimationPoint: points,
                storyId,
                userId: idUser
            }))
            //console.log(unwrapResult(res))
            //const g = unwrapResult(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        dispatch(getStory({idUser, roomId, username}))
    }, [])
    if (!username) return <Navigate to={'/'}/>
    return (
        <div
            className={'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full h-full h-full h-screen flex items-center justify-center flex-col overflow-auto'}>
            <p className={'h-2/5 flex items-center font-body font-bold'}>{title}</p>
            <div className={'h-3/5 flex flex-row justify-around w-full flex-wrap'}>
                {estimateValueVoted !== undefined ? (
                        <div className={'flex flex-row w-full'}>
                            <div className={'w-3/5 flex items-start justify-center'}>
                                <button onClick={goToResultPage} className={'bg-green-700 rounded-full px-4 py-2'}>
                                    <p className={'font-body font-bold text-white'}>view team result</p>
                                </button>
                            </div>
                            <div className={'flex items-center flex-col w-2/5'}>
                                <p className={'font-body font-bold'}>You has voted for this story</p>
                                <div
                                    className={'w-32 h-40 bg-white rounded-2xl flex items-center justify-center m-2 transition-colors duration-500 ease-in-out hover:bg-blue-700'}>
                                    <p className={'font-body font-bold'}>{estimateValueVoted}</p>
                                </div>
                            </div>
                        </div>
                    )
                    : (storyEstimations && storyEstimations.length > 1 && storyEstimations.map((e: estimation, key:
                        number) => (
                        <div key={key}
                             onClick={setEstimate(e.estimation.value)}
                             className={'cursor-pointer w-32 h-40 bg-white rounded-2xl flex items-center justify-center m-4 transition-colors duration-500 ease-in-out hover:bg-blue-700'}>
                            <p className={'font-body font-bold'}>{e.estimation.value}</p>
                        </div>
                    )))

                }
            </div>
        </div>
    )
}
