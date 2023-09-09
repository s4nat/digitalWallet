import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { BiSolidCookie } from 'react-icons/bi'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default withPageAuthRequired(
    function Topup() {
        const { user, isLoading } = useUser();
        const [values, setValues] = useState({});
        const headers = { Authorization: "changeme" }

        const data = {
            "email": user?.email,
            "name": user?.name,
        }

        axios
            .post(`https://digital-wallet-plum.vercel.app/digiwallet/user/register`, data, { headers })
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


        const onSubmit = (e: any) => {
            e.preventDefault();

            const formValue = {
                topup: e.target.topup_amount.value,
            };

            setValues(formValue);
            console.log(formValue.topup);

            axios
                .get(`https://digital-wallet-plum.vercel.app/digiwallet/transaction/stripe/topup?email=${user?.email}&amount=${formValue.topup}`, { headers })
                .then(async function (response) {
                    if (response.statusText === "OK") {
                        //const body = await response.json()
                        // window.location.href = response.data.url; // vercel not redirecting
                        redirect("google.com");
                        //console.log("success", "Booking Sucessful!");
                        //navigate("/");
                    }
                    console.log(response);
                })
                .catch((error) => {
                    console.error(
                        error
                    );
                });
        };


        return (
            <main className="min-h-screen flex-col bg-black gap-y-1">
                <Navbar user={user} loading={isLoading} />
                {user && (<div className="flex p-20">
                    <div className='w-1/2 p-5'>
                        <div>
                            <BiSolidCookie className="w-[100px] h-[70px] text-[#635dff]" />
                        </div>
                        <div className="pl-20 flex font-sans text-[65px] font-medium text-[#635dff]">
                            Add more fuel to your wallet.
                        </div>
                    </div>
                    <div className='w-1/2 flex items-center justify-center border border-[#635dff] rounded-xl'>
                        <Form.Root className="w-[260px]" onSubmit={onSubmit}>
                            <Form.Field className="grid mb-[50px]" name="topup_amount">
                                <div className="flex items-baseline justify-between pt-10">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Amount</Form.Label>
                                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                                        Please Enter the Top Up Amount
                                    </Form.Message>
                                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="patternMismatch">
                                        Please provide a valid amount
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        className="box-border w-full bg-blackA5 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9"
                                        type="topup-amount"
                                        pattern="\d+"
                                        required
                                        placeholder='Enter amount'
                                    />
                                </Form.Control>
                            </Form.Field>
                            <Form.Submit asChild>
                                <button className="w-full flex justify-center border-[2px] rounded-3xl border-[#F6D1CC] py-2 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]">
                                    <div>
                                        Continue
                                    </div>
                                </button>
                            </Form.Submit>
                        </Form.Root>
                    </div>


                </div>)}
                {
                    !user && !isLoading && (
                        <div className='flex justify-center pt-[20%]'>
                            <div className="flex flex-col justify-center items-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3
                                        className="text-lg leading-6 font-medium text-white"
                                        id="modal-headline"
                                    >
                                        You must sign in to access this page.
                                    </h3>
                                    {/* Display redirecting message to the user */}
                                    <div className="mt-6 text-center sm:mt-5">
                                        <div className="w-full flex justify-center border-[2px] rounded-3xl border-[#F6D1CC] py-2 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]">
                                            <Link href="/api/auth/login">
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </main>
        )
    });

