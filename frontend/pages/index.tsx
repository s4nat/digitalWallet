import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import {AiOutlineMail} from 'react-icons/ai'
import {BiSolidCookie} from 'react-icons/bi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen flex-col  flex items-center bg-[#1e212a]">
      <div className="flex items-center p-10">
        <div className="pl-10 pt-20">
          <div className="pl-20 flex font-sans text-[65px] font-medium text-[#635dff]">
            <BiSolidCookie className="w-[100px] h-[70px] text-[#635dff]"/>
            ByteWallet
          </div>
          <div className=" pt-5 font-sans text-2xl font-extralight text-[#FFFFFF]">
            Every byte counts. Money for your content, delivered straight.
          </div>
          <div className="pt-10 items-center">
            <div className="flex justify-between bg-white rounded-full items-center p-3">
              <div className="flex gap-2 pl-2 items-center text-[#1e212a]">
                <AiOutlineMail/>
                Click here to register.
              </div>
              <div className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 hover:bg-[#635dff] hover:text-[#FFFFFF] font-sans text-base font-medium text-[#1e212a]">
                <Link href="/">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}