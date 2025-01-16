import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
let navigate = useNavigate();
const [credentials, setCredentials] = useState({
  email: "",
  password: "",
});

const handleSubmit = async (e) => {
  e.preventDefault();

  // Send the request using the state values
  const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' // Corrected header
      },
      body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
      })
  });

  const json = await response.json();
  console.log(json);  // Debugging to check the response

  if (!json.success) {
      alert("Enter Valid Credentials");
  } 
  if (json.success) {
    localStorage.setItem("authToken", json.authToken);
    console.log(localStorage.getItem("authToken"));
      navigate("/");
  } 
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setCredentials({
      ...credentials,
      [name]: value
  });
}

return (
  <>
      <div className="container">
          <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                      Email address
                  </label>
                  <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      id="email"
                      aria-describedby="emailHelp"
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                      Password
                  </label>
                  <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      id="password"
                  />
              </div>
  

              <button type="submit" className="btn btn-success">
                  Submit
              </button>
              <Link to="/createuser" className="m-3 btn btn-danger">Create an account</Link>
          </form>
      </div>
  </>
);
}

export default Login;
