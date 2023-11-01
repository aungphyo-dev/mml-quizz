"use client"
import Link from "next/link";
import {BsArrowLeftShort, BsArrowRight} from "react-icons/bs";
import QUESTIONS from "../../../DB/data";
import {useEffect, useState} from "react";
import {GiCheckMark} from "react-icons/gi";
import {HiOutlineXMark} from "react-icons/hi2";

const Quick = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [currentQuestion, setCurrentQuestion] = useState<any>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
    const [result, setResult] = useState<any>([])
    const nextQuestion = () => {
        setResult([...result, selectedAnswer])
        if(currentQuestion === QUESTIONS.questions.length - 1){
            setChecked(true)
        }else {
            setCurrentQuestion((prev: any) => prev + 1)
            setSelectedAnswer(null)
        }
    }
    const restart = () => {
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setResult([])
      setChecked(false)
    }
    return (<div className='min-h-screen max-w-[500px] mx-auto bg-[#04364A] flex flex-col'>
        <div
            className="w-full flex justify-between items-center sticky top-0 backdrop-blur bg-[#04364A]/20 py-4 px-3">
            <Link href="/" className='p-2 rounded-full hover:bg-white/30'>
                <BsArrowLeftShort className="text-2xl text-white"/>
            </Link>
            <h1 className='text-2xl font-semibold text-[#DAFFFB] text-center'>Questions</h1>
        </div>
        <div className='w-full py-5 px-3'>
            {checked ?
                <div className="w-full">
                        {QUESTIONS.questions.map((question: any, index: number) => (
                        <ul key={index} className='w-full flex flex-col gap-y-2  mb-4'>
                            <li className='text-xl font-normal text-white mb-2'>
                                {question.question}
                            </li>
                            <li
                                className={`inline-flex items-center justify-between w-full p-2 border border-[#176B87] rounded text-[#DAFFFB] bg-[#176B87]`}>
                                {question.answers[question.correctIndex]}
                                <GiCheckMark className='text-xl'/>
                            </li>
                            {question.correctIndex !== result[index] && <li
                                className={`inline-flex items-center justify-between w-full p-2 border border-[#176B87] rounded  text-red-500 bg-[#176B87]`}>
                                {question.answers[result[index]]}
                                <HiOutlineXMark className="text-xl"/>
                            </li>}
                    </ul>))}
                </div>
                :
                <div className="w-full">
                    <h1 className='text-xl font-normal text-white mb-9'>
                        {QUESTIONS.questions[currentQuestion].question}
                    </h1>
                    <ul className='w-full flex flex-col gap-y-2'>
                        {QUESTIONS.questions[currentQuestion].answers.map((answer: any, index: number) => (
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
            {checked?<button onClick={restart}
                             className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold group ${selectedAnswer !== null ? "pointer-events-auto" : "pointer-events-none opacity-60"}`}>
                Restart
            </button> :<button onClick={nextQuestion}
                     className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold group ${selectedAnswer !== null ? "pointer-events-auto" : "pointer-events-none opacity-60"}`}>
                Next
                <BsArrowRight className='text-xl group-hover:translate-x-2 transition'/>
            </button>}
        </div>
    </div>);
};

export default Quick;
