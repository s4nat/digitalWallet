import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMail } from 'react-icons/ai'
import { BiSolidCookie } from 'react-icons/bi'
import { useUser } from '@auth0/nextjs-auth0/client'
import Navbar from './components/Navbar'
import axios from 'axios'

export default function Home() {
  const { user, isLoading } = useUser();
  const headers = { Authorization: "changeme" }

  const data = {
    "email": user?.email,
    "name": user?.name,
  }

  axios
    .post(`http://localhost:8080/digiwallet/user/register`, data, { headers })
    .then((response) => {
      console.log(
        response.data
      );
    })
    .catch((error) => {
      console.error(
        error
      );
    });


  return (
    <main className="h-screen flex-col flex bg-[#000000]">
      <Navbar user={user} loading={isLoading} />
      <div className='flex justify-center'>
        <div className="flex items-center p-10">
          <div className="pl-10 pt-20">
            <div className="pl-20 flex font-sans text-[65px] font-medium text-[#635dff]">
              <BiSolidCookie className="w-[100px] h-[70px] text-[#635dff]" />
              ByteWallet
            </div>
            <div className=" pt-5 font-sans text-2xl font-extralight text-[#FFFFFF]">
              Every byte counts. Money for your content, delivered straight.
            </div>
            <div className="pt-10 items-center">

              {!user && !isLoading && (
                <div className="flex justify-between bg-white rounded-full items-center p-3">
                  <div className="flex gap-2 pl-2 items-center text-[#1e212a]">
                    <AiOutlineMail />
                    Click here to register.
                  </div><div className="flex border-[2px] rounded-3xl border-[#F6D1CC] py-2 px-5 hover:bg-[#635dff] hover:text-[#FFFFFF] font-sans text-base font-medium text-[#1e212a]">
                    <Link href="/api/auth/login">Register</Link>
                  </div>
                </div>
              )
              }
              {
                user && (
                  <div className="flex justify-center">
                    <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-6 text-5xl text-[#635dff] font-bold">Hello! {user.name}</h1>
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </div>

    </main>
  )
}


