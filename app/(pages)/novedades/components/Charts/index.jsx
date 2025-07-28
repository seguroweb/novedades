import { SalesAreaChart } from "./SalesAreaChart";
import { SalesBarChart } from "./SalesBarChart";
import { SalesLineChart } from "./SalesLineChart";
import { SalesPieChart } from "./SalesPieChart";
import { SalesRadarChart } from "./SalesRadarChart";
import { SalesStackedBarChart } from "./SalesStackedBarChart";

export const Charts = () => {
  return (
    <div className="flex flex-col gap-5">
      <SalesLineChart />
      <div className="flex gap-5">
        <SalesBarChart />
        <SalesRadarChart />
      </div>
      <div className="flex gap-5">
        <SalesPieChart />
        <SalesAreaChart />
      </div>
      <SalesStackedBarChart />
    </div>
  );
};
