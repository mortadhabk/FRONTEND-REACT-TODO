import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../util/hooks";
import { register } from "../../Webservices/endpoints";
import { loadRegister } from "../../store/Auth/actions";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
function Register() {
  const dispatch = useDispatch();
  const [errors, Seterrors] = useState();
  const token = useSelector((state) => state.Auth.user.token);

// using form hook to manage all form inputs
  const { onChange, onSubmit, values } = useForm(registerUser, {
    name: "",
    email: "",
    password: "",
  });

//redirect the component to home page after registration
  let history = useHistory();
  if (token) {
    history.push("/");
  }

//creating the request register 
  async function registerUser() {
    register(values.name, values.email, values.password)
      .then((rqResult) => rqResult.json())
      .then((data) => {
        // dispatching the result to actions
        dispatch(loadRegister(data))

      }).catch(ex => {
        Seterrors(ex)
      })
  }

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h2 class="text-center text-dark mt-5">Register Form</h2>

            <div class="card my-5">

              <form class="card-body cardbody-color p-lg-5" onSubmit={onSubmit}>

                <div class="text-center">
                  <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px" alt="profile" />
                </div>
                <div>
                  <h6 >{errors != null ? "password , email or username is incorrect" : ""}</h6>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp" value={values.firstname}
                    onChange={onChange}
                    placeholder="User Name" />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="email" placeholder="email" name="email" value={values.email}
                    onChange={onChange} />
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control" id="password" placeholder="password" name="password" value={values.password}
                    onChange={onChange} />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-color px-5 mb-5 w-100" >Create Compte</button>
                </div>
                <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                  Registered? <a href="#" class="text-dark fw-bold"> Create an
                    Account</a>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
