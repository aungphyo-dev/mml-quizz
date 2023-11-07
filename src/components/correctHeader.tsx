const CorrectHeader = ({correctCount}:{correctCount : number}) => {
    return (
        <div className='w-full flex justify-between items-center text-xl font-semibold text-[#DAFFFB]'>
            <div>Your score</div>
            <div>{correctCount}</div>
        </div>
    );
};

export default CorrectHeader;