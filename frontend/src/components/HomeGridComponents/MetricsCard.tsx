import { useEffect, useState } from "react";
import axios from "axios";

interface MetricsInfo {
  totalAmount: number,
  avgAmountPerBill: number
}

function MetricsCard() {


  let headers = {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }

  const [metricData, setMetricData] = useState<MetricsInfo>({
    totalAmount: 0,
    avgAmountPerBill: 0
  });

  useEffect(() => {
      const fetchData = async () => {
          let response = await axios.get("http://localhost:8080/metricsCurrMonth", {headers: headers});
          setMetricData(response.data);
      }
      fetchData();
  }, []);


  return (
    <div className="flex flex-row justify-evenly items-center size-full">
        <div>
            <p>Curr. Spend</p>
            <h3 className="text-4xl">${metricData.totalAmount.toFixed(2)}</h3>
        </div>
        <div>
            <p>Avg. Spend</p>
            <h3 className="text-4xl">${metricData.avgAmountPerBill.toFixed(2)}</h3>
        </div>
    </div>
  );
}

export default MetricsCard;