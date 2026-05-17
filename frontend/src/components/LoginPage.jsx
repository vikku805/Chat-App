import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import{ useState } from "react";

const LoginPage = () => {
    const navigate  = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [response, setResponse] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
            const res = await axios.post("http://localhost:5000/api/auth/login", {
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
            navigate("/chat",{state:{user:data.userExists, token:data.token}});
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
          <h3 className="font-bold text-4xl mb-3">Login Page</h3>

          <div className="flex flex-col mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="email"
              className="border border-gray-200 p-2 rounded"
              placeholder="Email"
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
            not registered?{" "}
            <Link to="/" className="text-blue-500">
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;