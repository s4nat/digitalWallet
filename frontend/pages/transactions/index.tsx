
interface Transaction{
    date: string,
    fromName: string,
    toName: string,
    amount: number,
    status: number
}

const transactions: Transaction[] = [
    {
      date: "2023-09-10",
      fromName: "John Doe",
      toName: "Jane Doe",
      amount: 1000,
      status: 1
    },
    {
      date: "2023-09-11",
      fromName: "Jane Doe",
      toName: "John Doe",
      amount: 500,
      status: 2
    },
    {
      date: "2023-09-12",
      fromName: "John Doe",
      toName: "Peter Parker",
      amount: 200,
      status: 3
    },
  ];

export default function Transactions(){
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
                      <div>{transaction.date}</div>
                      <div>{transaction.fromName}</div>
                      <div>{transaction.toName}</div>
                      <div>{transaction.amount}</div>
                      <div>{transaction.status}</div>
                    </div>
                  ))
            }
            
            
        </main>
    )
}