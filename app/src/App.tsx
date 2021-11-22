import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {HomePage} from './feature/home/HomePage'
import {StoryPage} from "./feature/story/StoryPage";
import {ResultPage} from "./feature/result/ResultPage";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/story" element={<StoryPage/>}/>
                <Route path="/result" element={<ResultPage/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
