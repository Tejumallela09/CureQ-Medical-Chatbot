import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setReduxUserState} from "../redux/actions/userActions";
const registerUserApiRequest= async(firstname,lastname,password,email,gender,phoneNumber)=>{
  const {data}=await axios.post("http://localhost:5002/api/users/register",{firstname,lastname,password,email,gender,phoneNumber});
  return data;
}
const RegisterPage = () => {
  const reduxDispatch=useDispatch();
  return <RegisterPageComponent registerUserApiRequest={registerUserApiRequest}
  reduxDispatch={reduxDispatch}
  setReduxUserState={setReduxUserState}/>
};

export default RegisterPage;
