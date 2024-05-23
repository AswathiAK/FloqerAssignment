import { Table } from "antd";
import useFetchData from "../hooks/useFetchData";
import { useState } from "react";
import JobTable from "./JobTable";

const MainTable = () => {
  const data = useFetchData("/salaries.csv");
  const [selectedYear, setSelectedYear] = useState(null);
  const [jobsData, setJobsData] = useState([]);

  const tableObject = data.reduce((acc, curr) => {
    const year = curr.work_year;
    const salaryUsd = curr.salary_in_usd;

    if (!acc[year]) acc[year] = { year: year, totalJobs: 0, salary: 0 };

    acc[year].totalJobs += 1;
    acc[year].salary += +salaryUsd;
    return acc;
  }, {});

  const tableArray = Object.values(tableObject).map((item, index) => {
    return {
      key: index,
      ...item,
      averageSalary: (item.salary / item.totalJobs).toFixed(2),
    };
  });

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (rec1, rec2) => rec1.year > rec2.year,
    },
    {
      title: "Total Jobs",
      dataIndex: "totalJobs",
      key: "totalJobs",
      sorter: (rec1, rec2) => rec1.totalJobs > rec2.totalJobs,
    },
    {
      title: "Average Salary (USD)",
      dataIndex: "averageSalary",
      key: "averageSalary",
      sorter: (rec1, rec2) => rec1.averageSalary > rec2.averageSalary,
    },
  ];

  const handleRowClick = (row) => {
    setSelectedYear(row.year);
    const yearwiseJobs = data.filter((item) => item.work_year === row.year);
    const jobsObject = yearwiseJobs.reduce((acc, curr) => {
      const title = curr.job_title;
      if (!acc[title]) acc[title] = { jobTitle: title, count: 0 };
      acc[title].count += 1;
      return acc;
    }, {});
    const jobsArray = Object.values(jobsObject).map((item, index) => {
      return {
        ...item,
        key: index,
      };
    });
    setJobsData(jobsArray);
  };

  const clearSelection = () => {
    setSelectedYear(null);
  };

  return (
    <div className="table-container">
      {!selectedYear ? (
        <>
          <h2>Main Table</h2>
          <Table
            dataSource={tableArray}
            columns={columns}
            pagination={false}
            onRow={(row) => {
              return {
                onClick: () => handleRowClick(row),
              };
            }}
            style={{ cursor: "pointer" }}
          />
        </>
      ) : (
        <JobTable
          jobsData={jobsData}
          year={selectedYear}
          clearSelection={clearSelection}
        />
      )}
    </div>
  );
};

export default MainTable;
