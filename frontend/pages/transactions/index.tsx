import { useUser, withPageAuthRequired, } from "@auth0/nextjs-auth0/client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { FaCookieBite } from "react-icons/fa";
import Navbar from "../components/Navbar"; 
import { BiSolidCookie } from "react-icons/bi";

interface Transaction {
  date: string;
  from_name: string;
  to_name: string;
  amount: number;
  status: number;
}


const TRANSACTIONS_URL = process.env.SERVER_BASE_URL + "/digiwallet/transactions/";
export default withPageAuthRequired(
 function Transactions() {
    const { user, isLoading } = useUser();
    const [transactions, setTransactions] = React.useState([]);
    const checkStatus = (status: number) => {
      if (status == 0) return "Failure";
      else return "Success";
    };
    React.useEffect(() => {
      axios({
        method: "GET",
        url: TRANSACTIONS_URL + "1",
        headers: {"Authorization":process.env.API_KEY}
      }).then((response) => {
        setTransactions(response.data.Transaction)
      })
    })
  
  return (
    <main className="h-screen flex-col flex bg-[#000000] gap-y-1 font-sans">
      <Navbar user={user} loading={isLoading}/>
        <div className="flex justify-center p-5">
          <div className="flex font-sans text-[65px] font-medium text-[#635dff]">
            <BiSolidCookie className="w-[100px] h-[70px] text-[#635dff]"/>
            ByteWallet
          </div>
        </div>
        <div className="flex justify-center p-5">
          <div className=" pt-5 font-sans text-2xl font-extralight text-[#FFFFFF]">
              Your Balance is {}. Yum, thats some good money.
          </div>
        </div>
      <div className="pt-10 flex justify-center">
        <div className="w-3/4 flex h-[60px] justify-between text-[#635dff] font-bold px-10 pt-5 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
          <div>Date</div>
          <div>From</div>
          <div>To</div>
          <div>Amount</div>
          <div>Status</div>
        </div>

          {transactions.map((transaction: Transaction, index: number) => (
            
            <div
              key={index}
              className="flex justify-center"
            >
              <div className={`pt-10 w-3/4 flex h-[60px] bg-[#000000] justify-between text-white px-10 pt-5 border-1 rounded-xl`}>
              <div>{transaction.date}</div>
              <div>{transaction.from_name}</div>
              <div>{transaction.to_name}</div>
              <div>{transaction.amount}</div>
              <div>{checkStatus(transaction.status)}</div>
            </div>
            </div>
          ))}
          );

      </main>
    );
}
)