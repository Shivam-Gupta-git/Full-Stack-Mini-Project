import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getAllUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user/getallcontact`);
      if (response.data.success) {
        setUserData(response.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.log("Failed to fetch UserData", error);
    }
  };

  const totalUser = Array.isArray(userData)
    ? userData
    : userData?.users || userData?.data || [];

  const getPaginationAPI = async (pageNumber = 1, limit = 5) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendURL}/api/user/search?page=${pageNumber}&limit=${limit}`
      );

      setPaginationData(response.data.contact || []);
      setPage(response.data.currentPage || 1);
      setTotalPage(response.data.totalPage || 1);
    } catch (error) {
      console.log("Failed to fetch contacts", error);
      setPaginationData([]);
    } finally {
      setLoading(false);
    }
  };

  const users = Array.isArray(paginationData)
    ? paginationData
    : paginationData?.users || paginationData?.data || [];

  useEffect(() => {
    getAllUserData();
    getPaginationAPI(1, 5);
  }, []);

  const value = {
    backendURL,
    userData,
    users,
    getAllUserData,
    loading,
    page,
    totalPage,
    totalUser,
    getPaginationAPI
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
