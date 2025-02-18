import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Label } from "recharts";
import axios from "axios";
import { getAuth } from "../common/axios-header";
import { spendByCategory } from "../../types/types";

export default function SpendDistributionCard(){

    const [graphData, setGraphData] = useState<spendByCategory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let response  = await axios.get("http://localhost:8080/spendByCategory", {headers: getAuth()});
            let responseData: spendByCategory[] = response.data;
            for (let i = 0; i < responseData.length; i++){
                if (responseData[i].category === null){
                    responseData.splice(i, 1);
                }
            }
            setGraphData(responseData);
        }
        fetchData();
    }, []);

    const [pieHoverText, setPieHoverText] = useState({
        name: "",
        value: ""
    })

    function handleMouseEnter(e: any){
        setPieHoverText({
            name: e.category,
            value: e.amount.toString()
        })
    }


    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{"top": 0, "left": 40, "right": 40, "bottom": 0}}>

                    <Pie data={graphData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} innerRadius={50} fill="#8884d8" paddingAngle={0} onMouseEnter={handleMouseEnter}>
                        {graphData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <Label
                            content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-xl font-bold"
                                    >
                                    {pieHoverText.value}
                                    </tspan>
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground text-xs max-w-1"
                                    >
                                    {pieHoverText.name}
                                    </tspan>
                                </text>
                                )
                            }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
