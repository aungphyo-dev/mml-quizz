"use client"
import {useEffect, useState} from "react";
import {timerTypes} from "~/@types/types";

const CountdownTimer = ({start,end,checked,callBack}:timerTypes) => {
    const [startTime, setStartTime] = useState(start)
    useEffect(() => {
        const interval = setInterval(() => {
           if (startTime > end && !checked) setStartTime((prevSeconds) => prevSeconds - 1);
        }, 1000);
        if (startTime === end) callBack(true)

        return () => clearInterval(interval);
    }, [startTime]);
    return (
        <div className="w-full flex justify-between items-center">
            <h1 className='text-xl font-semibold text-[#DAFFFB]'>Your time Left</h1>
            <div className="w-[50px] h-[50px] bg-gray-400 rounded-full grid place-items-center"
                 style={{background: `conic-gradient(#7d2ae8 ${startTime * 3.6}deg,#ededed 0deg)`}}>
                <div className="w-[40px] h-[40px] rounded-full bg-white text-gray-900 text-sm grid place-items-center">
                    {startTime} s
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer