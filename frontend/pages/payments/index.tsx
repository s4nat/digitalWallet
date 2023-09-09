import React, {useState} from 'react';
import * as Form from '@radix-ui/react-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/Navbar';

export default function SendMoney() {
    const {user, isLoading} = useUser();
  return (
    <main className="h-screen flex-col  flex bg-[#000000]">
        <Navbar user={user} loading={isLoading}/>
        <div className= "bg-black flex items-center justify-center h-screen">
            <Form.Root className="w-[260px]">
            <Form.Field className="grid mb-[10px]" name="send-amount">
            <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Amount</Form.Label>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                Please Enter Amount to Send
                </Form.Message>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="patternMismatch">
                Please provide a valid amount
                </Form.Message>
            </div>
            <Form.Control asChild>
                <input
                className="box-border w-full bg-blackA5 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9"
                type="topup-amount"
                pattern="^[0-9]*[.]?[0-9]+$"
                required
                />
            </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="phone-number">
            <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Phone Number</Form.Label>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                Please enter phone number 
                </Form.Message>
                <Form.Message className="text-[13px] text-white opacity-[0.8]" match="patternMismatch">
                Please provide a valid phone number
                </Form.Message>
            </div>
            <Form.Control asChild>
                <input
                className="box-border w-full bg-blackA5 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9"
                type="tel"
                pattern="[0-9]{8}"
                required
                />
            </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="w-full flex justify-center border-[2px] rounded-3xl border-[#F6D1CC] py-2 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]"> 
                    <div>
                        Send
                    </div>
                </button>
            </Form.Submit>
        </Form.Root>
        </div>
    </main>
  );
}
