import BillsTableCard from "../components/HomeGridComponents/BillsTableCard";
import MetricsCard from "../components/HomeGridComponents/MetricsCard";
import SpendDistributionCard from "../components/HomeGridComponents/SpendDistributionCard";
import SpendGraphCard from "../components/HomeGridComponents/SpendGraphCard";
import NavBar from "../components/HomeGridComponents/NavBar";

function HomeScreen(){
    return (
        <div  className="flex flex-col py-2 px-3 gap-2 size-full">
            <NavBar/>
            <div id="grid" className="grid grid-rows-[1fr_2fr_3fr] grid-cols-2 bg-slate-50 h-full gap-2.5 overflow-auto">
                <div id="metrics-card" className="bg-slate-200 shadow-lg rounded-lg" >
                    <MetricsCard currSpend={100} avgSpend={200}/>
                </div>

                <div id="chart" className="bg-slate-200 col-start-2 col-end-3 row-start-1 row-end-3 shadow-lg rounded-lg" >
                    <SpendGraphCard />
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