
function BillsTableCard(){

    const Bills = [
        {
            id: 1,
            storeName: "Walmart",
            amount: 100,
            date: "2021-09-01"
        },
        {
            id: 2,
            storeName: "Target",
            amount: 200,
            date: "2021-09-02"
        },
        {
            id: 3,
            storeName: "Amazon",
            amount: 300,
            date: "2021-09-03"
        },
        {
            id: 4,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        },
        {
            id: 5,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        },
        {
            id: 6,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        },
        {
            id: 6,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        },
        {
            id: 6,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        },
        {
            id: 6,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        },
        {
            id: 6,
            storeName: "Walmart",
            amount: 400,
            date: "2021-09-04"
        }
    ]

    return (
        <div className="flex flex-col gap-3 p-5">
            {Bills.map((bill) => {
                return (
                    <div key={bill.id} className="flex justify-between items-center bg-slate-300 px-4 py-2 rounded-lg shadow-lg">
                        <div>
                            <h3 className="text-lg">{bill.storeName}</h3>
                            <p className="text-sm">{bill.date}</p>
                        </div>
                        <h3 className="text-xl">${bill.amount}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default BillsTableCard;