import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    await axios.post("http://localhost:7000/register", data);
    alert("Registered");
  };

  return (
  <div>
    <h2>Register</h2>

    <div>
      <input
        placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />
    </div>

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
      <button onClick={submit}>Register</button>
    </div>

    {/* 🔽 Back to Login button */}
    <div style={{ marginTop: "15px" }}>
      <button onClick={() => window.location = "/"}>
        Back to Login
      </button>
    </div>
  </div>
);
}