import { FC, useEffect, useContext } from "react";
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { POPULATION_CONSTRUCTION } from "../constant";
import { apiClient } from "../lib/apiClient";
import { Population } from "../types";
import { useCheck } from "../hooks/useCheck";
import { useCheckContext } from "../pages/_app";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);
type Props = {
  prefCode: number;
  isCheck: boolean;
  prefName: string;
};
const PopulationTransitionGraph: FC = () => {
  // 1980 ~ 2045年までを配列化
  let yearArray: string[] = [];
  const max = 14;
  for (let i = 0; yearArray.length < max; i++) {
    const value = 1980 + 5 * i;
    yearArray.push(`${String(value)}年`);
  }

  // const { state, checkOn, checkOff } = useCheck();
  const { state, checkOn, checkOff } = useCheckContext();

  const graphData = {
    labels: yearArray,
    datasets: state.checkList.filter((value) => value.isCheck),
  };

  const options: {} = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Line
        height={300}
        width={300}
        data={graphData}
        options={options}
        id="chart-key"
      />
    </div>
  );
};

export default PopulationTransitionGraph;
