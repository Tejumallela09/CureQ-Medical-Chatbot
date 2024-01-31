// LoginPage.js
import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

// LoginPage.js
const loginUserApiRequest = async (email, password, doNotLogout) => {
  try {
    const { data } = await axios.post("http://localhost:5002/api/users/login", { email, password, doNotLogout });
    if(data.userLoggedIn.doNotLogout)localStorage.setItem("userInfo",JSON.stringify(data.userLoggedIn));
    return data;
  } catch (error) {
    throw error;
  }
};




const LoginPage = () => {
  const reduxDispatch = useDispatch();

  return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />;
};

export default LoginPage;
