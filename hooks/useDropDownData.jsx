import { useState, useEffect } from 'react';
import api from '../utilities/api';
import { useGlobalContext } from '../context/GlobalProvider';
export const HandleDropdownFormat = (data, key, label) => {
  return data.map((item) => {
    return {
      key: parseInt(item[key]),
      value: item[label],
    };
  });
};

export function useDropDown(spName, params = {}, key, value, dependencies = [],flag=true) {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const context = useGlobalContext();

  const fetchDropDownData = async () => {
    try {
      setLoading(true);
      console.log(context?.company, 'company from dropdown component');
      let url = `/table/filter?sp=${spName}`;
      if (params != {}) {
        if (params.CompanyID) {
          url += `&${new URLSearchParams(params).toString()}`;
        } else {
          url += `&${new URLSearchParams(params).toString()}&CompanyID=${context?.company}`;
        }
      }

      let response 
      if (flag) {
        response = await api.get(`${url}`);
      }
      //(response.data.data, "444444");
      setOriginalData(response.data.data);

      const formattedData = HandleDropdownFormat(response.data.data, key, value);
      setData(formattedData);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the dropdown options');
    } finally {
      setLoading(false); // Ensure loading is set to false in finally block
    }
  };

  useEffect(() => {
    fetchDropDownData();
  }, [...dependencies, JSON.stringify(params)]); // Include relevant dependencies

  return { data, loading, error, originalData };
}
