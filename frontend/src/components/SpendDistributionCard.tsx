import { PieChart, Pie, PolarAngleAxis, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

function SpendDistributionCard(){

    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        },
        {
          "name": "Group C",
          "value": 300
        },
        {
          "name": "Group D",
          "value": 200
        },
        {
          "name": "Group E",
          "value": 278
        },
        {
          "name": "Group F",
          "value": 189
        }
      ];
    
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{"top": 0, "left": 40, "right": 40, "bottom": 0}}>
                    {/* <PolarAngleAxis dataKey="name"/> */}
                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={40} fill="#8884d8" paddingAngle={3}>
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend layout="vertical" align="left" verticalAlign="middle"/>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SpendDistributionCard;