const Answer = ({correctCount}:{
    correctCount : number
}) => {
    return (
        <div>
            <div className='px-3 w-full flex justify-between items-center text-xl font-semibold text-[#DAFFFB]'>
                <div>Your score</div>
                <div>{correctCount}</div>
            </div>
        </div>
    )
}

export default Answer;