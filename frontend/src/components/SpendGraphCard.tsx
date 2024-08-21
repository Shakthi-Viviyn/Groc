import { AreaChart, YAxis, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface Month {
    name: string;
    amount: string | null;
}

function SpendGraphCard(){

    const [month, setMonth] = useState<Month>({
        name: "",
        amount: ""
    });

    const data = [
        {
            "name": "",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
          "name": "Jan",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Feb",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Mar",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Apr",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "May",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Jun",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Jul",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
            "name": "",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
          }
      ]
    function renderTooltip(props: any){
        console.log(props);
        if (props.payload.length !== 0){
            let name: string = props.payload[0].payload["name"];
            let amount: number = props.payload[0].payload["pv"];
            if (name === ""){
                setMonth({name: "", amount: ""});
            }else{
                setMonth({name: name + " Spend", amount: `${amount}`});
            }
        };
        return null;
    }

    return (
        <div className="flex flex-col items-center h-full">
            <div className="self-end mb-auto mt-5 mr-5">
                <p className="text-sm">{month.name}</p>
                <h3 className=" text-3xl">{month.amount}</h3>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart height={250} data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" type="category"/>
                    <YAxis hide={true}/>
                    <Tooltip key={"Spend"} content={renderTooltip}/>
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SpendGraphCard;