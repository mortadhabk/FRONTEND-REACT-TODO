import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Webservices/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { addLogout } from "../../store/Auth/actions";
import "./Header.css"
function Header() {
  const dispatch = useDispatch();
  const token =  useSelector((state) => state.Auth.user.token);
  function disconnect() {
 
    localStorage.removeItem("jwtToken");
    dispatch(addLogout())
  }
  const menubar = !token ? (

    <nav class="navbar navbar-expand-lg navbar-light bg-light ">

      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">

            <Link class="nav-link alink" to="/">Home</Link>

          </li>

          <li class="nav-item ">
            <Link class="nav-link alink" to="/login">Login</Link>

          </li>
          <li class="nav-item">
            <Link class="nav-link alink" to="/register">Register</Link>

          </li>

        </ul>
      </div>
    </nav>


  ) :
    (

      <nav class="navbar navbar navbar-expand-lg navbar-light bg-light ">

        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">

              <Link class="nav-link" to="/"> <li>Home</li></Link>

            </li>
            <li class="nav-item dropdown">
              <button class="btn btn-outline-danger my-2 my-sm-0 alink" type="submit" onClick={() => { disconnect() }}>Se deconnecter</button>
            </li>
          </ul>
        </div>
      </nav>

    );
  return menubar;
}

export default Header;
