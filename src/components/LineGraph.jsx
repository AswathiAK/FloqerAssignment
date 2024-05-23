import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import useFetchData from "../hooks/useFetchData";

const LineGraph = () => {
  const data = useFetchData("/salaries.csv");

  const lineGraphObject = data.reduce((acc, curr) => {
    const year = curr.work_year;

    if (!acc[year]) acc[year] = { year: year, totalJobs: 0 };

    acc[year].totalJobs += 1;
    return acc;
  }, {});

  const lineGraphData = Object.values(lineGraphObject);

  return (
    <div className="graph-container">
      <h2>Line Graph</h2>
      <LineChart width={600} height={300} data={lineGraphData}>
        <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="year" />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default LineGraph;
