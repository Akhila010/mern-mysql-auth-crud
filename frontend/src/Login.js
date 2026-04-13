import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const submit = async () => {
    const res = await axios.post("http://localhost:7000/login", data);
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
  <div>
    <h2>Login</h2>

    <div>
      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />
    </div>

    <div>
      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />
    </div>

    <div>
      <button onClick={submit}>Login</button>
    </div>

    {/* Register button below */}
    <div style={{ marginTop: "15px" }}>
      <button onClick={() => window.location = "/register"}>
        Register
      </button>
    </div>
  </div>
);
}