
interface MetricsCardProps {
    currSpend: number;
    avgSpend: number;
}

function MetricsCard({ currSpend, avgSpend}: MetricsCardProps) {
  return (
    <div className="flex flex-row justify-evenly items-center size-full">
        <div>
            <p>Curr. Spend</p>
            <h3 className="text-4xl">${currSpend}.23</h3>
        </div>
        <div>
            <p>Avg. Spend</p>
            <h3 className="text-4xl">${avgSpend}.85</h3>
        </div>
    </div>
  );
}

export default MetricsCard;