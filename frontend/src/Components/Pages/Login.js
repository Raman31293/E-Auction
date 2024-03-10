import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../url";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const[error, setError] = useState('');
  const navigate = useNavigate();

  // function to handle form submission
  //   on click submit button
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/user/login`, formData);
      console.log(response);
      if (response.status === 200) {
        navigate("/home");
      } else {
        setError("Invalid login credentials");//set error message
      }
    } catch (error) {
      setError("Login Failed");
    }
  };

  return (
    <div style={{ margin: "2%" }}>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
          <label htmlFor="exampleInputPassword1" className="form-label">
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
        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Login
        </button>
      </form>
    </div>
  );
}
