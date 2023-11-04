"use client"
import Link from "next/link";
import {BsArrowLeftShort, BsArrowRight} from "react-icons/bs";
import {useEffect, useState} from "react";
import {GiCheckMark} from "react-icons/gi";
import {HiOutlineXMark} from "react-icons/hi2";

const Quick = () => {
    const [questions, setQuestions] = useState<any>(null)
    const [randomQuestions, setRandomQuestions] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
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
    // const token = process.env.NEXT_API_TOKEN;
    // console.log(`Bearer ${token}`)
    const getQuestions = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("https://api.mahawthada.com.mm/api/v1/questions",{
                headers:{
                    "Authorization" : `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY0ZDFjOTk1NWU1MzIyM2Q1MTA0MmM3MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJmODY1YjUzNjIzYjEyMWZkMzRlZTU0MjZjNzkyZTVjMzNhZjhjMjI3Iiwicm9sZUxhYmVsIjoiQWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wOC0wOFQwNDo1MDoyOS4wODZaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDgtMDhUMDQ6NTA6MjkuMDg2WiIsIl9fdiI6MH0sImV4cCI6MTY5OTAzMTQyMjkzMCwiaWF0IjoxNjk5MDA5ODIyfQ.hr1hMgOQIycT2bZjluxgLTI2uRKFoLqyxFK99LsUYZ3RDMGefIqJ6CFW0r6yCvVplv2EVovAtI_Gj1URw7yqCZHO8-amnNfu7EtivGH_NgGJBo1pTf15SNYsIkk8mMuxOoMfpnJ1qZc5dCnB_g_hdWjXrtWjrDurKKRyuIsoquh_B2HUldTn_GSwBY9oIiF0ZBJMFIciW19SGlbiEvgDEUyzKV-pGdQYbqVSJR2UVE1BrFtGW8-6Zt5U-kyrKzXYJDtFfnhUdwGASdQktLs8V3jkJ3kVmRBlqni85XcTB-R01PgSyxLy-juym2_D61t-47mst4crY2igQJtmTyBhSA`
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
    const [checked, setChecked] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [result, setResult] = useState<any>([])
    const [startTime, setStartTime] = useState(100)
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
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
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
