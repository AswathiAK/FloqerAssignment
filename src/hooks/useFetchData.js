import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import toast from "react-hot-toast";

const useFetchData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const parsedData = Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
        }).data;
        setData(parsedData);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [url]);

  return data;
};

export default useFetchData;
