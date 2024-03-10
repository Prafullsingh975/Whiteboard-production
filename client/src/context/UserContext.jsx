import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [host,setHost] = useState();
  const [users,setUsers] = useState([]);
  const config = {headers:{"content-type":"application/json"}}
  return (
    <UserContext.Provider value={{ user, setUser,config ,users,setUsers,host,setHost}}>
      {children}
    </UserContext.Provider>
  );
};

export const userState = () => useContext(UserContext);

export default UserContextProvider;
