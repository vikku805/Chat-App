import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import{ useState } from "react";

const RegisterPage = () => {
    const navigate  = useNavigate();
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [response, setResponse] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name: username,
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
           const data = res.data;
           if (data.message === "success") {
             console.log(res.data);
            // setUsername(data.message);
            navigate("/login");
           }
           setResponse(data.message);
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="border-2 rounded-2xl p-4">
        <form onSubmit={handleSubmit} className="flex flex-col w-80">
          <h3 className="font-bold text-4xl mb-3">Register Page</h3>

          <div className="flex flex-col mb-2">
            <label htmlFor="username">UserName :</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              id="username"
              className="border border-gray-200 p-2 rounded"
              placeholder="UserName"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-200 p-2 rounded"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-200 p-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}               
            />
          </div>

          <button
            type="submit"
            className="border border-gray-500 p-2 rounded w-full"
          >
            Submit
          </button>

          <div className="text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;