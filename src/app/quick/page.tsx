"use client"
import Link from "next/link";
import {BsArrowLeftShort, BsArrowRight} from "react-icons/bs";
import {useEffect, useState} from "react";
import {GiCheckMark} from "react-icons/gi";
import {HiOutlineXMark} from "react-icons/hi2";

const Quick = () => {
    const [questions, setQuestions] = useState<any>(null)
    const [randomQuestions, setRandomQuestions] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    function getRandomNumber(count : number) {
        for (let i = 0; i < count; i++) {
            const randomData = questions.data[Math.floor(Math.random() * questions.data.length)];
            setRandomQuestions((prevState : any) => [...prevState,randomData]);
        }
    }

    useEffect(() => {
        if(!isLoading){
            getRandomNumber(10);
        }
    }, [isLoading]);
    const getQuestions = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("https://api.mahawthada.com.mm/api/v1/questions",{
                headers:{
                    "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY0YWVmYjIzMjIzMDZmMTUzZDVjYTcyOCIsInVzZXJuYW1lIjoiYWRtaW4iLCJtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJmODY1YjUzNjIzYjEyMWZkMzRlZTU0MjZjNzkyZTVjMzNhZjhjMjI3Iiwicm9sZUxhYmVsIjoiU3VwZXIgQWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0xMlQxOToxMjozNS4wMTlaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDctMTJUMTk6MTI6MzUuMDE5WiIsIl9fdiI6MH0sImV4cCI6MTY5ODkzMjkyMTA5OCwiaWF0IjoxNjk4OTExMzIxfQ.qWAMGwwlkAjaQ3BmCvme12MQAa64Zoo7og5Rk_2JAUiWSy0quqtzTcIt4MfEfP6n8UhzWwga1kTfra81_Mwq4KCLtJy37kBcr0Q2JzTxeRfWbC459UdJ8J55JQ2Xfpbwcqb7XLTxattBIO_Q5IigrK2caIX35jhYfHF6ng44L3jwEh7xaFiSnuNLxZMUdOy12HL7e9aldNw4pDyyikJeN1xf1qjKizVBbc4IvGR_d8QJCUcOqJd10xyOqO4zbhVeaCW_DUw9UTiJW19nh0w9q7FENqNBxJ8mN8NSdmTAFOMYN9XDWtnmK9jfzAfSR0TrY8b88sYhnQshTfZDOrVJog"
                }
            })
            const data = await  res.json();
            setQuestions(data)
            setIsLoading(false)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getQuestions()
    }, []);
    const [checked, setChecked] = useState<boolean>(false)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
    const [result, setResult] = useState<any>([])
    const [startTime, setStartTime] = useState<number>(100)
    const [correctCount, setCorrectCount] = useState(0)
    const nextQuestion = () => {
        setResult([...result, selectedAnswer])
        if (randomQuestions[currentQuestion].correct_index === selectedAnswer){
            setCorrectCount(prevState => prevState + 1)
        }
        if (currentQuestion !== randomQuestions.length - 1) {
            setCurrentQuestion((prev: any) => prev + 1)
            setSelectedAnswer(null)
        }else {
            setChecked(true)
        }
    }
    const restart = () => {
        setStartTime(100)
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setResult([])
        setChecked(false)
        setRandomQuestions([])
        getQuestions()
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime > 0 && !checked) setStartTime((prevSeconds) => prevSeconds - 1);
            }, 1000);
        if  (startTime === 0) setChecked(true)
        return () => clearInterval(interval);
    }, [startTime,checked]);
    if(isLoading){
        return (
            <div className='min-h-screen max-w-[500px] mx-auto bg-[#04364A] flex justify-center items-center text-white'>
                Loading......
            </div>
        )
    }else {
        return (
            <div className='min-h-screen max-w-[500px] mx-auto bg-[#04364A] flex flex-col'>
                <div
                    className="w-full flex justify-between items-center sticky top-0 backdrop-blur bg-[#04364A]/20 py-4 px-3">
                    <Link href="/" className='p-2 rounded-full hover:bg-white/30'>
                        <BsArrowLeftShort className="text-2xl text-white"/>
                    </Link>
                    {checked? <h1
                        className='text-xl font-semibold text-[#DAFFFB] text-center'>Result</h1>:<h1
                        className='text-xl font-semibold text-[#DAFFFB] text-center'>Question {currentQuestion + 1}/{randomQuestions.length}</h1>}
                </div>
                {checked && <div className='px-3 w-full flex justify-between items-center text-xl font-semibold text-[#DAFFFB]'>
                    <div>Your score</div>
                    <div>{correctCount}</div>
                </div>}
                {!checked && <div className="w-full flex justify-between items-center px-3">
                    <h1 className='text-xl font-semibold text-[#DAFFFB]'>Your time Left</h1>
                    <div className="w-[50px] h-[50px] bg-gray-400 rounded-full grid place-items-center"
                         style={{background: `conic-gradient(#7d2ae8 ${startTime * 3.6}deg,#ededed 0deg)`}}>
                        <div className="w-[40px] h-[40px] rounded-full bg-white text-sm grid place-items-center">
                            {startTime} s
                        </div>
                    </div>
                </div>}
                <div className='w-full py-5 px-3'>
                    {checked ?
                        <div className="w-full">
                            {randomQuestions.map((question: any, index: number) => (
                                <ul key={index} className='w-full flex flex-col gap-y-2  mb-9'>
                                    <li className='text-xl font-normal text-white mb-2'>
                                        <span className='text-2xl font-bold mr-1'>{index + 1} .</span> {question.question}
                                    </li>
                                    <li
                                        className={`w-full p-2 border border-[#176B87] rounded text-[#DAFFFB] bg-[#176B87]`}>
                                        <div className="w-full font-semibold mb-2 text-white">Correct Answer:</div>
                                        <div className='w-full inline-flex items-center justify-between'>
                                            {question.answers[question.correct_index]}
                                            <GiCheckMark className='text-lg'/>
                                        </div>
                                    </li>
                                    {question.correct_index !== result[index] && <li
                                        className={`w-full p-2 border border-[#176B87] rounded  text-red-500 bg-[#176B87]`}>
                                        <div className="w-full font-semibold mb-2 text-white">Your Answer:</div>
                                        <div className="w-full inline-flex items-center justify-between ">
                                            {question.answers[result[index]] ? question.answers[result[index]] : "Not answer!" }
                                            <HiOutlineXMark className="text-xl"/>
                                        </div>
                                    </li>}
                                </ul>))}
                        </div>
                        :
                        <div className="w-full">
                            <h1 className='text-xl font-normal text-white mb-9'>
                                {randomQuestions[currentQuestion]?.question}
                            </h1>
                            <ul className='w-full flex flex-col gap-y-2'>
                                {randomQuestions[currentQuestion]?.answers.map((answer: any, index: number) => (
                                    <li
                                        key={index}
                                        onClick={() => setSelectedAnswer(index)}
                                        className={`inline-flex items-center justify-between w-full p-2 border border-[#176B87] rounded cursor-pointer hover:text-[#DAFFFB] hover:bg-[#176B87]  ${selectedAnswer === index ? 'text-[#DAFFFB] bg-[#176B87] ' : 'bg-[#64CCC5] border-blue-600'}`}>
                                        {answer}
                                    </li>))}
                            </ul>
                        </div>}
                </div>
                <div className='w-full mt-auto  py-5 px-3'>
                    {checked ? <button onClick={restart}
                                       className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold`}>
                        Restart
                    </button> : <button onClick={nextQuestion}
                                        className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold group`}>
                        {currentQuestion !== randomQuestions.length - 1 ? "Next" : "Check"}
                        <BsArrowRight className='text-xl group-hover:translate-x-2 transition'/>
                    </button>}
                </div>
            </div>)
    }
};

export default Quick;
