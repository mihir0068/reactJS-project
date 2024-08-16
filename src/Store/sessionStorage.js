import { useState } from "react";
import { useSelector } from "react-redux";

const sessionStorage = () => {
  const users = useSelector((state) => state.user.userData);
  console.log(users)
const [userData,setUserData]=useState({
    id:"",firstName:"",lastName:"",
})
  return {}
};
export default sessionStorage;
