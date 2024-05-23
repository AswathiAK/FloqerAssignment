import React from "react";
import { Table } from "antd";

const JobTable = ({ jobsData, year, clearSelection }) => {
  const jobColumns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Number of Jobs",
      dataIndex: "count",
      key: "count",
      sorter: (rec1, rec2) => rec1.count > rec2.count,
    },
  ];
  return (
    <div className="jobs-container">
      <h2>Jobs in {year}</h2>
      <button onClick={clearSelection}>Back to Main Table</button>
      <Table dataSource={jobsData} columns={jobColumns} pagination={true} />
    </div>
  );
};

export default JobTable;
