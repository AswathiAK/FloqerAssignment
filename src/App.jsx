import React from "react";
import "./App.css";
import MainTable from "./components/MainTable";
import LineGraph from "./components/LineGraph";

const App = () => (
  <div className="container">
    <MainTable />
    <LineGraph />
  </div>
);

export default App;
