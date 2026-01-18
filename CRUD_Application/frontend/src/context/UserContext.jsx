import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext();

const UserContextProvider = (props) => {

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const[userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate

  const getAllUserData = async () => {
   try {
    const response = await axios.get(`${backendURL}/api/user/getallcontact`)
    if(response.data.success){
      setUserData(response.data || []) 
      setLoading(false)
    }
   } catch (error) {
    console.log('Failed to fetch UserData', error)
   }
  }

  const users = Array.isArray(userData)
  ? userData
  : userData?.users || userData?.data || [];

  useEffect(()=> {
    getAllUserData()
  }, [])

  const value = {
    navigate,
    backendURL,
    users,
    getAllUserData,
    loading
  }

  return(
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider