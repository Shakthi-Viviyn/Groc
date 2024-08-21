import MetricsCard from "./MetricsCard";
import SpendDistributionCard from "./SpendDistributionCard";
import SpendGraphCard from "./SpendGraphCard";


function Home(){
    return (
        <div id="grid" className="grid grid-rows-[1.2fr_2fr_3fr] grid-cols-2 bg-slate-50 size-full gap-2.5">
            <div id="metrics-card" className="bg-slate-200 shadow-lg rounded-lg" >
                <MetricsCard currSpend={100} avgSpend={200}/>
            </div>

            <div id="chart" className="bg-slate-200 col-start-2 col-end-3 row-start-1 row-end-3 shadow-lg rounded-lg" >
                <SpendGraphCard />
            </div>
            <div id="piechart" className="bg-slate-200 col-start-1 col-end-2 row-start-2 row-end-3 shadow-lg rounded-lg" >
                <SpendDistributionCard />
            </div>
            <div id="table" className="bg-slate-200 col-start-1 col-end-3 row-start-3 row-end-4 shadow-lg rounded-lg" ></div>
        </div>
    );
};

export default Home;