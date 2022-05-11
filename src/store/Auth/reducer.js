import {
  LOGIN,
  REGISTER,
  LOGOUT,
} from "./type";
const initialState = {
  user: { 
   id : "",
   name : "",
   email : "",

},
token: ""

}
if (localStorage.getItem("jwtToken")) {
  const decodedToken = localStorage.getItem("jwtToken");
  initialState.user.token = decodedToken;
}
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user : action.payload
       
      };
      case REGISTER:
        return {
          ...state,
          user : action.payload
         
        };
        case LOGOUT:
          return {
            ...state,
            user : {}
           
          };
   
    default:
      return state;
  }
};
export default AuthReducer;
