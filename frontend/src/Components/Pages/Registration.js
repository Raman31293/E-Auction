import React, { useState } from "react";
import { baseURL } from "../../url";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Registration() {
  //    setting fiels to get userdetails
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // state to hold error message
  const [error, setError] = useState("");
  // for success registration
  const [successMessage, setSuccessMessage] = useState("");

  //   on click submit button
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/user/registration`, formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Registration Successful");
      })
      .catch((error) => {
        setError("Registration Failed");
      });
  };

  // taking formate for form data from bootstrap
  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '50%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registration</h2>
      <form>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
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
        {/* Display success message */}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Submit
        </button>
        </div> 
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p>Already have an account? <Link to="/">Login</Link></p>
          </div>     
      </form>
    </div>
    </div>
  );
}
