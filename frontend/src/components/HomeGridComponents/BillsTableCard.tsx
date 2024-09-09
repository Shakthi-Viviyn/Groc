import { useContext, useEffect, useState } from "react";
import { ModalContext, ModalContextType } from "../../pages/Layout";
import DetailedBillView from "../ModalContentComponents/DetailedBillView";
import { Bill } from "../../types/types";
import axios from "axios";



function BillsTableCard(){

    const [bills, setBills] = useState<Bill[]>([]);

    let { setShowModal, setModalContent } = useContext(ModalContext) as ModalContextType;

    let headers = {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }

    useEffect(() => {

        const fetchData = async () => {
            let response = await axios.get("http://localhost:8080/bills", {headers: headers});
            setBills(response.data);
        }

        fetchData();
    }, []);
    
    function handleBillClick(bill: Bill){
        setShowModal(true);
        setModalContent(<DetailedBillView billId={bill.id}/>);
    }

    return (
        <div className="flex flex-col gap-3 p-5">
            {bills.map((bill) => {
                return (
                    <div key={bill.id} className="flex justify-between items-center bg-slate-300 px-4 py-2 rounded-lg shadow-lg cursor-pointer hover-effect" onClick={() => handleBillClick(bill)}>
                        <div>
                            <h3 className="text-lg">{bill.storeName}</h3>
                            <p className="text-sm">{bill.date}</p>
                        </div>
                        <h3 className="text-xl">${bill.totalAmount}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default BillsTableCard;