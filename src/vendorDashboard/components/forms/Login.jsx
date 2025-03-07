import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";
import "./Login.css"; // 🎨 Import CSS File

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log("Checking VendorId:", vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      window.location.reload();
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        localStorage.setItem("firmId", vendorData.vendorFirmId);
        localStorage.setItem("firmName", vendorData.vendor.firm[0].firmName);
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginBox">
        {loading ? (
          <div className="loaderSection">
            <ThreeCircles height={80} width={80} color="#4fa94d" />
            <p>Logging in... Please wait</p>
          </div>
        ) : (
          <form onSubmit={loginHandler} autoComplete="off">
            <h3>Vendor Login</h3>

            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span className="showPassword" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
            
            <button type="submit">Login</button>
            <p className="forgotPassword">Forgot password?</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
