import { useUser, withPageAuthRequired, } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { FaCookieBite } from "react-icons/fa";
import Navbar from "../components/Navbar"; 
import { BiSolidCookie } from "react-icons/bi";

interface Transaction {
  date: string;
  fromName: string;
  toName: string;
  amount: number;
  status: number;
}

const transactions: Transaction[] = [
  {
    date: "2023-09-10",
    fromName: "John Doe",
    toName: "Jane Doe",
    amount: 1000,
    status: 1,
  },
  {
    date: "2023-09-11",
    fromName: "Jane Doe",
    toName: "John Doe",
    amount: 500,
    status: 0,
  },
  {
    date: "2023-09-12",
    fromName: "John Doe",
    toName: "Peter Parker",
    amount: 200,
    status: 1,
  },
];


export default withPageAuthRequired(
 function Transactions() {
  const {user, isLoading} = useUser();
  
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
      </div>

        {transactions.map((transaction: Transaction, index: number) => (
          
          <div
            key={index}
            className="flex justify-center"
          >
            <div className={`pt-10 w-3/4 flex h-[60px] bg-[#000000] justify-between text-white px-10 pt-5 border-1 rounded-xl`}>
            <div>{transaction.date}</div>
            <div>{transaction.fromName}</div>
            <div>{transaction.toName}</div>
            <div>{transaction.amount}</div>
            <div>
              {transaction.status === 1 ? (
                <span className="text-green-500 px-2 rounded-lg">Success</span>
              ) : transaction.status === 0 ? (
                <span className="text-red-500 px-2 rounded-lg">Failure</span>
              ) : (
                transaction.status
              )}
            </div>
          </div>
          </div>
        ))}
        ;

    </main>
  );
}
)