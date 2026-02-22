import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const hc = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const hs = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.log("Backend error:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={hs}>
      <input name="email" type="email" placeholder="email" value={form.email} onChange={hc} required />
      <br />
      <input name="password" type="password" placeholder="password" value={form.password} onChange={hc} required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
