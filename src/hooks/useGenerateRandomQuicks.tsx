import {RootQuestion} from "~/@types/types";
import {useEffect, useState} from "react";

const UseGenerateRandomQuicks = (questions:RootQuestion | any,count : number) => {
    const [randomQuestions, setRandomQuestions] = useState<any>([])
    useEffect(() => {
        function getRandomNumber() {
            for (let i = 0; i < count; i++) {
                const randomData = questions[Math.floor(Math.random() * questions.length)];
                setRandomQuestions((prevState : any) => [...prevState,randomData]);
            }
        }
        getRandomNumber()
    }, [questions,count]);
    return randomQuestions
};
export default UseGenerateRandomQuicks;