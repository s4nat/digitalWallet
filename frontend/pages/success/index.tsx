import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import axios from 'axios';
import Toast from '../components/Toast';

export default function Sucess() {
  const { user, isLoading } = useUser();
  const topupAmount = sessionStorage.getItem('topupAmount'); // Access session storage value
  const headers = { Authorization: "changeme" };

  // Use useEffect to send the GET request when the component mounts
  useEffect(() => {
    if (user && topupAmount) {
      axios
        .get(`https://digital-wallet-plum.vercel.app/digiwallet/transaction/topupBalance?email=${user.email}&amount=${topupAmount}`, { headers })
        .then(function (response) {
          if (response.status === 200) {
            console.log("Successfully updated");
          }
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, topupAmount]); // Add user and topupAmount as dependencies

    return (
      <main className="h-screen flex-col  flex bg-[#000000]">
        <Navbar user={user} loading={isLoading}/>
        <div className="flex justify-center items-center h-screen bg-black">
          <div className="flex flex-col justify-center items-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-white"
                id="modal-headline"
              >
                Payment successfully completed...
              </h3>
              {/* Display redirecting message to the user */}
              <div className="mt-6 text-center sm:mt-5">
                <Link href="/">
                    <div className="w-full flex justify-center border-[2px] rounded-3xl border-[#F6D1CC] py-2 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]">
                      Done
                    </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
    </main>
);
}