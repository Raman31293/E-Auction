import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseURL } from "../../url";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // function to handle form submission
  //   on click submit button
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/user/login`, formData);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("Token", response.data.token);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        setError("Invalid login credentials"); //set error message
      }
    } catch (error) {
      setError("Login Failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/auction.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form style={{ width: "300px" }}>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ border: "1px solid #D2B48C", borderRadius: "5px" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
            style={{ border: "1px solid #D2B48C", borderRadius: "5px" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        {/* Display error message */}
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ margin: "auto", display: "block" }}
          onClick={submitForm}
        >
          Login
        </button>
        <Link to="/registration" className="btn btn-secondary mt-2" style={{  margin: "auto", display: "block" }}>New User Sign Up Here!</Link>
     
      </form>
    </div>
  );
}
