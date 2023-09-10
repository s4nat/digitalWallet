
import Link from "next/link";
import { FaCookieBite } from "react-icons/fa";

type HeaderProps = {
  user?: any
  loading: boolean
}

export default function Navbar(props:HeaderProps) {
  
  return (
    <nav>
      <div className="flex h-20 justify-between bg-[#000000]">
        <div className="w-1/2 flex p-[25px] justify-between">
          <div className="flex rounded-2xl py-1  px-4 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <FaCookieBite />
            <Link href="/">ByteWallet</Link>
          </div>
          <div className="flex rounded-2xl py-1  px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <Link href="/transactions">Transactions</Link>
          </div>
          <div className="flex rounded-2xl py-1 px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <Link href="/topup">Top Up</Link>
          </div>
          <div className="flex  rounded-2xl py-1 px-5 hover:bg-[#FFFFFF] font-sans text-base font-medium text-[#635dff]">
            <Link href="/payments">Payments</Link>
          </div>
        </div>
        <div className="flex p-[15px] justify-end">
          {props.user && !props.loading &&(
            <div className="flex items-center rounded-3xl  border-transparent px-5 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]">
              <Link href="/api/auth/logout">Sign Out</Link>
            </div>
          )}
          {!props.user && (
            <div className="flex items-center rounded-3xl hover:border-[2px] border-transparent py-2 px-5 hover:bg-[#635dff] font-sans text-base font-medium text-[#ffffff]">
              <Link href="/api/auth/login">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
