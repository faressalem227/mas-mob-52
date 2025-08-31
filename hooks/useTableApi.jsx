import { useCallback } from 'react';
import api, { REPORT_SERVER_URL } from '../utilities/api'; // adjust path as needed

export const useTableApi = () => {
  const fetchNextCode = useCallback(async (tbName, codeCol,company) => {
    const { data } = await api.get(
      `/table?sp=GetNextCodeForTable&TableName=${tbName}&CodeFieldName=${codeCol}&CompanyID=${company}`
    );
    return data?.data?.[0]?.NextCode ?? '';
  }, []);

  const fetchReportFilters = useCallback(async (reportID) => {
    const { data } = await api.get(`${REPORT_SERVER_URL}/report/fillter/${reportID}`);
    return data?.data ?? [];
  }, []);

  return {
    fetchNextCode,
    fetchReportFilters,
  };
};
