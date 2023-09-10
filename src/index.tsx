import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import NavBar from "./Components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodayWeatherPage from "./Page/TodayWeatherPage";
import './index.css';
import './Style/Page.css';
import FutureWeatherPage from "./Page/FutureWeatherPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className={"website"}>
        <NavBar />
        <div className={"page"}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/today-weather"} element={<TodayWeatherPage />}/>
                    <Route path={"/home"} element={<div>home</div>}/>
                    <Route path={"/seven-days-weather"} element={<FutureWeatherPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
