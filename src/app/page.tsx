"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Home = () => {
    const router = useRouter();
    useEffect(() => {
        router.prefetch("/quick")
    }, [router]);
    return (
        <div className='h-screen max-w-[500px] mx-auto bg-[#04364A] py-5 px-3 flex flex-col'>
            <div className='w-full'>
                <h1 className='font-semibold text-[#DAFFFB] text-2xl text-center'>Quick App</h1>
            </div>
            <div className="w-full">
                <h2 className='text-[350px] text-[#176B87] font-bold text-center leading-none'>?</h2>
            </div>
            <div className='w-full mt-auto'>
                <Link href="/quick" className='block w-full text-center px-5 py-2 rounded bg-[#64CCC5] text-gray-900 font-semibold'>Get Started</Link>
            </div>
        </div>
    );
};

export default Home;
