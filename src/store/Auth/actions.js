import {
  LOGIN,
  REGISTER,
  LOGOUT,

} from "./type";


export const loadLogin = (values) => {
  console.log("action : " + values)
  return {
    type: LOGIN,
    payload: values,
  };
};

export const loadRegister = (values) => {
  return {
    type: REGISTER,
    payload: values,
  };
};
export const addLogout = () => {
  return {
    type: LOGOUT,
  };
};
