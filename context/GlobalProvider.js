import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../utilities/api';
import { HandleDropdownFormat } from '../utilities/useDropDownData';
import Toast from 'react-native-toast-message';
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [departmentData, setDepartmentData] = useState([]);
  const [departmentTypeData, setDepartmentTypeData] = useState([]);
  const [DepartmentID, setDepartmentID] = useState(null);
  const [DepartmentTypeID, setDepartmentTypeID] = useState(null);
  const [SystemID, setSystemID] = useState();
  const [Lang, setLang] = useState(1);
  const [Rtl, setRtl] = useState(true);
  const [company, setCompany] = useState(user?.company);
  const [isMounted, setIsMounted] = useState(false); // Ensure company is derived from user state

  const fetchDepartmentTypeData = useCallback(async () => {
    try {
      setLoading(true);
      console.log(user?.company, '1111111');
      setCompany(user?.company);
      const response = await api.get(
        `/table?sp=api_admin_Departments_Type_List&CompanyID=${user?.company}&LangID=${Lang}&UserName=${user?.username}&SystemID=4`
      );

      console.log('executing');

      setDepartmentTypeData(
        HandleDropdownFormat(response.data.data, 'DepartmentTypeID', 'DepartmentTypeName')
      );
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching DepartmentType data',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [Lang, user]);

  const fetchDropdownData = useCallback(async () => {
    try {
      setLoading(true);
      console.log(user?.username, 'kk');

      const response = await api.get(
        `/table?sp=api_admin_Department_List&CompanyID=${1}&LangID=${Lang}&UserName=${user?.username}&SystemID=4&DepartmentTypeID=${DepartmentTypeID}`
      );
      setDepartmentData(HandleDropdownFormat(response.data.data, 'DepartmentID', 'DepartmentName'));
      //CompanyID.Current = response.data.data[0]?.CompanyID
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching Department data',
      });
    } finally {
      setLoading(false);
    }
  }, [Lang, user, DepartmentTypeID]);

  const checkAuth = async () => {
    try {
      const username = JSON.parse(await SecureStore.getItemAsync('UserName'));
      const UserTypeID = JSON.parse(await SecureStore.getItemAsync('UserTypeID'));
      const UserSystemID = JSON.parse(await SecureStore.getItemAsync('SystemID'));
      const UserDepartmentID = JSON.parse(await SecureStore.getItemAsync('UserDepartmentID'));
      const UserDepartmentName = JSON.parse(await SecureStore.getItemAsync('UserDepartmentName'));
      const company = JSON.parse(await SecureStore.getItemAsync('company'));
      console.log(username);

      if (username) {
        setIsLogged(true);
        setUser({
          username: username,
          type: UserTypeID,
          selectedDepartmentID: UserDepartmentID,
          DepartmentID: UserDepartmentID,
          UserDepartmentName: UserDepartmentName,
          SystemID: UserSystemID,
          company: company, // Ensure this is updated
        });
        setSystemID(UserSystemID); // Set state for SystemID
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  };

  const saveTokens = async (accessToken, refreshToken, user) => {
    await SecureStore.setItemAsync('accessToken', JSON.stringify(accessToken));
    await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));
    await SecureStore.setItemAsync('UserName', JSON.stringify(user.username));
    await SecureStore.setItemAsync('email', JSON.stringify(user.email));
    await SecureStore.setItemAsync('UserTypeID', JSON.stringify(user.UserTypeID));
    await SecureStore.setItemAsync('SystemID', JSON.stringify(user.SystemID));
    await SecureStore.setItemAsync('UserDepartmentName', JSON.stringify(user.UserDepartmentName));
    await SecureStore.setItemAsync('UserDepartmentID', JSON.stringify(user.UserDepartmentID));
    await SecureStore.setItemAsync('company', JSON.stringify(user.company));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password, fcmToken) => {
    try {
      console.log(email);

      const response = await api.post(`/auth/signin`, {
        UserName: email,
        password,
        fcmToken: fcmToken,
      });
      console.log(response);

      const { accessToken, refreshToken, user } = response?.data;
      await saveTokens(accessToken, refreshToken, user);

      setUser({
        username: user.username,
        type: user.UserTypeID,
        DepartmentID: user.UserDepartmentID,
        SystemID: user.SystemID, // Ensure this is set
        UserDepartmentName: user.UserDepartmentName,
        company: company,
      });
      setSystemID(user.SystemID); // Set state for SystemID
      setIsLogged(true);
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error);
    }
  };

  const getFunction = async (url) => {
    try {
      const response = await api.get(url);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const postFunction = async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const putFunction = async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const deleteFunction = async (url) => {
    try {
      const response = await api.delete(url);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const logOut = async () => {
    try {
      await api.get('/auth/signout');
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('UserName');
      await SecureStore.deleteItemAsync('UserTypeID');
      await SecureStore.deleteItemAsync('SystemID');
      await SecureStore.deleteItemAsync('UserDepartmentID');
      await SecureStore.deleteItemAsync('UserDepartmentName');
      await SecureStore.deleteItemAsync('email');
      setIsLogged(false);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('UserName');
        await SecureStore.deleteItemAsync('UserTypeID');
        await SecureStore.deleteItemAsync('SystemID');
        await SecureStore.deleteItemAsync('UserDepartmentID');
        await SecureStore.deleteItemAsync('UserDepartmentName');
        await SecureStore.deleteItemAsync('email');
        setIsLogged(false);
        setUser(null);
      }
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (user?.username) fetchDepartmentTypeData();
  }, [user, Lang]);

  useEffect(() => {
    if (user?.username) fetchDropdownData();
  }, [user?.username, DepartmentTypeID, Lang]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // console.log('context departmentTyoedata', departmentTypeData);
  // console.log('context departmentdata', departmentData);

  console.log('company', user?.company);
  if (!isMounted) return null;

  return (
    <GlobalContext.Provider
      value={{
        logOut,
        isLogged,
        setIsLogged,
        login,
        setLoading,
        user,
        setUser,
        loading,
        checkAuth,
        getFunction,
        postFunction,
        putFunction,
        fetchDropdownData,
        deleteFunction,
        SystemID,
        departmentData,
        departmentTypeData,
        DepartmentID,
        setDepartmentID,
        DepartmentTypeID,
        setDepartmentTypeID,
        Lang,
        Rtl,
        company: user?.company,
        setLang,
        setRtl,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
