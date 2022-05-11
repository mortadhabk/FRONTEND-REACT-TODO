import React, { useState, useEffect } from 'react';
import { useForm } from "../../util/hooks";
import { login} from "../../Webservices/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { loadLogin } from "../../store/Auth/actions";
import { useHistory } from "react-router-dom";

import "./Login.css"
export default function Login() {
  const dispatch = useDispatch();
 

  let history = useHistory();
  // store the errors from the request in our state
  const [errors, Seterrors] = useState();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: "",
    password: "",
  });

//redirect the component to home page after login

    const token = useSelector((state) => state.Auth.user.token);
  if (token) {
    history.push("/");
  }

  //creating the request login 

  function registerUser() {
    login(values.email,values.password)
    .then((rqResult) => rqResult.json()).catch(ex => {
      Seterrors(ex)
    })
    .then((data) => {
      localStorage.setItem("jwtToken", data.token);
      dispatch(loadLogin(data))
  })}

  return (
   <div>
     <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5">Login Form</h2>
   
        <div className="card my-5">

          <form className="card-body cardbody-color p-lg-5" onSubmit={onSubmit}>

            <div className="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>
            <div>
              <h6 >{errors != null ?  "password or email is incorrect"  : ""}</h6>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="email" name="email"
                value={values.email}
                onChange={onChange}/>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password" placeholder="password" name="password" value={values.password}
                onChange={onChange}/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-5 w-100" >Login</button>
              </div>

          </form>
        </div>

      </div>
    </div>
  </div>
   </div> 
  );
}
