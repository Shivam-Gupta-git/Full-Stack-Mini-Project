import { createContext } from "react";
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext();

const UserContextProvider = (props) => {

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  
  const navigate = useNavigate

  const value = {
    navigate,
    backendURL,
  }

  return(
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider