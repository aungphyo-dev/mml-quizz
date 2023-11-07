const QuickHeader = ({currentQuestion,QuestionsLength}:{
    currentQuestion : number,
    QuestionsLength : number
}) => {
    return (
        <div className='flex justify-between items-center'>
            <h1
                className='text-xl font-semibold text-[#DAFFFB] text-center'>Question</h1>
            <h1
                className='text-xl font-semibold text-[#DAFFFB] text-center'>{currentQuestion + 1}/{QuestionsLength}</h1>
        </div>
    );
};

export default QuickHeader;