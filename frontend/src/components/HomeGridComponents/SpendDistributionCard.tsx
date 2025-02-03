import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";
import { HEADERS } from "../common/axios-header";
import { spendByCategory } from "../../types/types";

function SpendDistributionCard(){

    const [graphData, setGraphData] = useState<spendByCategory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let response  = await axios.get("http://localhost:8080/spendByCategory", {headers: HEADERS});
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
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{"top": 0, "left": 40, "right": 40, "bottom": 0}}>

                    <Pie data={graphData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} innerRadius={40} fill="#8884d8" paddingAngle={3}>
                        {graphData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend layout="vertical" align="left" verticalAlign="middle" wrapperStyle={{ maxHeight: '200px', overflowY: 'scroll'}}/>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SpendDistributionCard;