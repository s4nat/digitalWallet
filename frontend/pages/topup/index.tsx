import React from 'react';
import * as Form from '@radix-ui/react-form';
import {BiSolidCookie} from 'react-icons/bi'
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/Navbar';

export default function Topup(){
    const {user, isLoading} = useUser();
    return(
        <main className="min-h-screen flex-col bg-black gap-y-1">
            <Navbar user={user} loading={isLoading}/>
            <div className="flex p-20">
            {/* <div className= "bg-[#1e212a] flex items-center justify-center h-screen"> */}
                <div className='w-1/2 p-5'>
                    <div>
                        <BiSolidCookie className="w-[100px] h-[70px] text-[#635dff]"/>
                    </div>
                    <div className="pl-20 flex font-sans text-[65px] font-medium text-[#635dff]">
                        Add more fuel to your wallet.
                    </div>
                </div>
                <div className='w-1/2 flex justify-center pt-20'>
                    <div className='w-1/2 border border-[#635dff] p-10 rounded-xl'>
                        <div className="flex font-sans text-[25px] font-medium text-[#635dff]">
                            Top Up Now.
                        </div>
                        <Form.Root className="w-[260px]">
                        <Form.Field className="grid mb-[50px]" name="topup-amount">
                        <div className="flex items-baseline justify-between pt-10">
                            
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
                </div>
                
            </div>
        </main>
    )
};

