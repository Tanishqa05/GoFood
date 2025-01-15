import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "" // Added address to the state
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the request using the state values
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Corrected header
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation // Include address in the request body
            })
        });
    
        const json = await response.json();
        console.log(json);  // Debugging to check the response
    
        // If backend sends a failure response, show the alert
        if (!json.success) {
            alert("Enter Valid Credentials");
        } else {
            alert("User created successfully!");
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
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={handleChange}
                            id="address"
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </>
    );
}

export default SignUp;
