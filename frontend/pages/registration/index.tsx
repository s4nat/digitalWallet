import React, {useState} from 'react';
import * as Form from '@radix-ui/react-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/Navbar';

export default function Registration() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Add your registration logic here
  };
  const {user, isLoading} = useUser();
  return (
    <main className="h-screen flex-col  flex bg-[#000000]">
        <Navbar user={user} loading={isLoading}/>
      <div className= "bg-black flex items-center justify-center h-screen">
        <Form.Root className="w-[260px]">
        <div className="grid grid-cols-2 gap-4 mb-10">
        <Form.Field className="grid mb-[10px]" name="first-name">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">First Name</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please Enter First Name
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className={`box-border w-full bg-blackA5 shadow-red inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9 ${
            isSubmitted && firstName === '' ? 'border-red-500' : ''
          }`}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Control>
    </Form.Field>
        <Form.Field className="grid mb-[10px]" name="last-name">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Last Name</Form.Label>
            <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
              Please Enter Last Name
            </Form.Message>
            <Form.Message className="text-[13px] text-white opacity-[0.8]" match="patternMismatch">
              Please provide a valid last name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA5 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9  border-red-500"
              type="text"
              pattern="[A-Za-z]+" 
              required
            />
          </Form.Control>
        </Form.Field>

        </div>

        <Form.Field className="grid mb-[10px]" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Email</Form.Label>
            <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
              Please Enter Email
            </Form.Message>
            <Form.Message className="text-[13px] text-white opacity-[0.8]" match="patternMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA5 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:color-white selection:bg-blackA9"
              type="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
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
                Submit
            </div>
          </button>
        </Form.Submit>
      </Form.Root>
      </div>
    </main>
  )
}