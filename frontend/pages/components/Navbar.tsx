import Link from "next/link";
import { FaCookieBite } from "react-icons/fa";

export function Navbar() {
  return (
    <nav>
      <div className="flex justify-between bg-[#000000]">
        <div className="flex p-[25px] justify-start gap-10">
          <div className="flex rounded-3xl hover:border-[2px] border-transparentpy-2 px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <FaCookieBite />
            <Link href="/">ByteWallet</Link>
          </div>
          <div className="flex rounded-3xl hover:border-[2px] border-transparentpy-2 px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <Link href="/transactions">Transactions</Link>
          </div>
          <div className="flex rounded-3xl hover:border-[2px] border-transparentpy-2 px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <Link href="/topup">Top Up</Link>
          </div>
          <div className="flex  rounded-3xl hover:border-[2px] border-transparentpy-2 px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <Link href="/">Payments</Link>
          </div>
        </div>
        <div className="flex p-[15px] justify-end">
          <div className="flex rounded-3xl hover:border-[2px] border-transparent py-2 px-5 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]">
            <Link href="/api/auth/login">Sign In</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
