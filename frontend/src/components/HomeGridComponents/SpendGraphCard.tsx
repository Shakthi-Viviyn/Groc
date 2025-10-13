
import { AreaChart, YAxis, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { MonthSpend } from "../../types/types";
import axios from "axios";
import { getAuth } from "../common/axios-header";
import { backendHost } from "../../config";

function SpendGraphCard(){

    const [graphData, setGraphData] = useState<MonthSpend[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`http://${backendHost}/spendPastYear`, {headers: getAuth()});
            setGraphData(response.data);
        }
        fetchData();
    }, []);

    function handleMouseMove(e: any){
        const activeIndex = e.activeTooltipIndex;
        if (activeIndex){
            setGraphHoverText(graphData[activeIndex]);
        }
    }

    const [graphHoverText, setGraphHoverText] = useState({
        month: "",
        amount: ""
    })

    return (
        <div className="flex flex-col items-center h-full">
            <div className="self-end mb-auto mt-5 mr-5">
                <p className="text-sm">{graphHoverText.month}</p>
                <h3 className=" text-3xl">{graphHoverText.amount}</h3>
            </div>
            <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart height={250} data={graphData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }} onMouseMove={handleMouseMove}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" type="category"/>
                    <YAxis hide={true} />
                    <Tooltip key={"Spend"} active={false}/>
                    <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SpendGraphCard;