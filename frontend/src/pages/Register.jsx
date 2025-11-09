import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      // save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
      nav("/");
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data?.msg || err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:360}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
      </form>
    </div>
  );
}
