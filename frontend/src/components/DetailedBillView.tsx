import { Bill } from "./types";

function DetailedBillView({bill}: {bill: Bill}) {
  return (
    <div className="size-full grid grid-rows-[1fr_3fr] grid-cols-[1fr_4fr] gap-5 pt-8">
      <div className="flex flex-col justify-center items-center text-left bg-slate-300 rounded-lg shadow-lg">
        <h3 className="text-lg">Bill amount</h3>
        <p className="text-4xl">${bill.totalAmount}</p>
      </div>
      <div className="flex flex-col justify-center items-center p-5 bg-slate-300 rounded-lg shadow-lg">
        <div className="flex flex-col justify-evenly h-full">
            <div>
                <h3>Store Name</h3>
                <p className="text-2xl">{bill.storeName}</p>
            </div>
            <div className="h-[2px] rounded-lg bg-slate-500 w-full"/>
            <div>
                <h3>Date</h3>
                <p className="text-2xl">{bill.date}</p>
            </div>
            <div className="h-[2px] rounded-lg bg-slate-500 w-full"/>
            <div>
                <h3>Location</h3>
                <p className="text-2xl">{bill.location}</p>
            </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-2 py-2 bg-slate-300 col-start-2 col-end-3 row-start-1 row-end-3 overflow-y-auto rounded-lg shadow-lg">
        {bill.products.map((product) => 
                {
                    return (
                        <div key={product.id} className="flex justify-between items-center bg-slate-200 px-4 py-2 rounded-lg shadow-lg">
                            <div>
                                <h3 className="text-lg">{product.brand} | {product.name}</h3>
                                <p className="text-sm">{product.category}</p>
                            </div>
                            <div>
                                <p className="text-lg">${product.price}</p>
                                <p className="text-sm">{product.quantity} {product.units}</p>
                            </div>
                        </div>
                    )
                }
            )}
      </div>

    </div>
  );
}

export default DetailedBillView;