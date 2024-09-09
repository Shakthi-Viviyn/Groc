import { AreaChart, YAxis, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { MonthSpend } from "../../types/types";
import axios from "axios";


function SpendGraphCard(){

    let headers = {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }

    const [graphData, setGraphData] = useState<MonthSpend[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get("http://localhost:8080/spendPastYear", {headers: headers});
            setGraphData(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center h-full">
            {/* <div className="self-end mb-auto mt-5 mr-5">
                <p className="text-sm">{graphData[0].name}</p>
                <h3 className=" text-3xl">{graphData[1].amount}</h3>
            </div> */}
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart height={250} data={graphData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" type="category"/>
                    <YAxis hide={true}/>
                    <Tooltip key={"Spend"}/>
                    <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SpendGraphCard;