import BillsTableCard from "../components/HomeGridComponents/BillsTableCard";
import MetricsCard from "../components/HomeGridComponents/MetricsCard";
import SpendDistributionCard from "../components/HomeGridComponents/SpendDistributionCard";
import SpendGraphCard from "../components/HomeGridComponents/SpendGraphCard";
import NavBar from "../components/HomeGridComponents/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth } from "../components/common/axios-header";

function HomeScreen(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("token not found in local storage");
            navigate("/login");
        }

        const verifyToken = async () => {
            try {
                let response = await await axios.get("http://localhost:8080/verify", {headers: getAuth()});
                if (response.status !== 200){
                    console.log("token is not valid");
                    localStorage.removeItem("token");
                    navigate("/login");
                }
                setLoading(false);
            } catch (error){
                localStorage.removeItem("token");
                navigate("/login");
            }
        }

        verifyToken();
    }, [navigate]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl">Loading...</h1>
        </div>
    )

    return (
        <div  className="flex flex-col py-3 px-3 gap-4 size-full">
            <NavBar/>
            <div id="grid" className="grid grid-rows-[1fr_2fr_3fr] grid-cols-2 bg-slate-50 h-full gap-4 overflow-auto">
                <div id="metrics-card" className="bg-slate-200 shadow-lg rounded-lg" >
                    <MetricsCard/>
                </div>

                <div id="chart" className="bg-slate-200 col-start-2 col-end-3 row-start-1 row-end-3 shadow-lg rounded-lg" >
                    <SpendGraphCard/>
                </div>
                <div id="piechart" className="bg-slate-200 col-start-1 col-end-2 row-start-2 row-end-3 shadow-lg rounded-lg" >
                    <SpendDistributionCard />
                </div>
                <div id="table" className="bg-slate-200 col-start-1 col-end-3 row-start-3 row-end-4 shadow-lg rounded-lg overflow-auto" >
                    <BillsTableCard/>
                </div>
            </div>
        </div>
        
    );
};

export default HomeScreen;