
import React from "react";
import axios from "axios"; 
interface Transaction{
    date: string,
    from_name: string,
    to_name: string,
    amount: number,
    status: number,
    createdAt: string
}

// const transactions: Transaction[] = [
//     {
//       date: "2023-09-10",
//       fromName: "John Doe",
//       toName: "Jane Doe",
//       amount: 1000,
//       status: 1
//     },
//     {
//       date: "2023-09-11",
//       fromName: "Jane Doe",
//       toName: "John Doe",
//       amount: 500,
//       status: 2
//     },
//     {
//       date: "2023-09-12",
//       fromName: "John Doe",
//       toName: "Peter Parker",
//       amount: 200,
//       status: 3
//     },
//   ];
  
const TRANSACTIONS_URL = "http://localhost:8080/digiwallet/transaction/";
axios.defaults.headers.common["Authorization"] = "changeme";

export default function Transactions() {
    const [transactions, setTransactions] = React.useState([]);
    React.useEffect(() => {
        axios({
            method: "GET",
            url: TRANSACTIONS_URL + "1",
            headers: { "Authorization": "changeme" }
        }).then((response) => {
            setTransactions(response.data.Transaction)
        })
    }, []);

    const checkStatus = (input: number) => {
        if (input == 0) return "Failed";
        else return "Successful"
    }

    return(
        <main className="min-h-screen flex-col  flex items-center bg-[#1e212a] pt-10 gap-y-1">
            <div className="w-3/4 flex h-[60px] bg-white justify-between text-[#635dff] font-bold px-10 pt-5 rounded-xl">
                <div>
                    Date
                </div>
                <div>
                    From
                </div>
                <div>
                    To
                </div>
                <div>
                    Amount
                </div>
                <div>
                    Status
                </div>
            </div>
            {
                transactions.map((transaction: Transaction) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="w-3/4 flex h-[60px] bg-[#635dff] justify-between text-white font-bold px-10 pt-5 border-1 rounded-xl">
                      <div>{transaction.createdAt.split("T")[0]}</div>
                      <div>{transaction.from_name}</div>
                      <div>{transaction.to_name}</div>
                      <div>{transaction.amount}</div>
                      <div>{checkStatus(transaction.status)}</div>
                    </div>
                  ))
            }
            
            
        </main>
    )
}