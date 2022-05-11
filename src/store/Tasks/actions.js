import {
  ADDTASK,
} from "./type";


export const Addtask = (values) => {
  console.log("action : " + values)
  return {
    type: ADDTASK,
    payload: values,
  };
  
};



