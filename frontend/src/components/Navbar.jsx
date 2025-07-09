import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="main-container1">
      <div className="navbar">
        <Link style={{ textDecoration: "none", color: "#000" }} to={"/"}>
          <h1>CompileX</h1>
        </Link>

        {token ? (
          <div
            style={{ height: "100%", width: "350px" }}
            className="mb-1  d-flex justify-content-around align-items-center px-3 gap-3"
          >
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to={"/dashboard"}
            >
              <h6>Dashbaord</h6>
            </Link>
            <button className="btn btn-sm btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link className="btn btn-primary mb-1 btn-md" to={"/login"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
