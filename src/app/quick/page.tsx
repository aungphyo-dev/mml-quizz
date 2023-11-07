import Link from "next/link";
import {BsArrowLeftShort} from "react-icons/bs";
import {QuickQuestions} from "~/components";

const getQuick = async () => {
    try {
        const res = await fetch("https://api.mahawthada.com.mm/api/v1/questions", {
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
        })
        return await res.json();
    } catch (e) {
        console.log(e)
    }
}
const Quick = async () => {
    const res = await getQuick()
    return (
        <div className='min-h-screen max-w-[500px] mx-auto bg-[#04364A] flex flex-col'>
            <div
                className="w-full flex justify-between items-center sticky top-0 backdrop-blur bg-[#04364A]/20 py-4 px-3">
                <Link href="/" className='p-2 rounded-full hover:bg-white/30'>
                    <BsArrowLeftShort className="text-2xl text-white"/>
                </Link>
            </div>
            <QuickQuestions questions={res.data}/>
        </div>
    );
};

export default Quick;