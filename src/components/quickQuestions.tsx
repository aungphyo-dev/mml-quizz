"use client"
import Link from "next/link";
import {useState} from "react";
import {RootQuestion} from "~/@types/types";
import {BsArrowRight} from "react-icons/bs";
import {HiOutlineXMark} from "react-icons/hi2";
import {GiCheckMark} from "react-icons/gi";
import useGenerateRandomQuicks from "~/hooks/useGenerateRandomQuicks";
import {CorrectHeader, CountdownTimer, QuickHeader} from "~/components/index";


const QuickQuestions = ({questions}:RootQuestion) => {
    const [checked, setChecked] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<null|number>(null)
    const [result, setResult] = useState<any>([])
    const [correctCount, setCorrectCount] = useState(0)
    const randomQuestions = useGenerateRandomQuicks(questions,10)
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
    return (
        <div className='flex flex-col gap-y-5 px-3 flex-1'>
            <CountdownTimer start={100} end={0} checked={checked} callBack={setChecked}/>
            {checked && <CorrectHeader correctCount={correctCount}/>}
            {!checked && <QuickHeader currentQuestion={currentQuestion} QuestionsLength={randomQuestions.length}/>}
            <div className='w-full py-5'>
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
            <div className='w-full mt-auto  py-5'>
                {checked ? <Link href={"/"}
                                   className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold`}>
                    Restart
                </Link> : <button onClick={nextQuestion}
                                    className={`flex justify-center items-center w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold group`}>
                    {currentQuestion !== randomQuestions.length - 1 ? "Next" : "Check"}
                    <BsArrowRight className='text-xl group-hover:translate-x-2 transition'/>
                </button>}
            </div>
        </div>
    );
};

export default QuickQuestions;
