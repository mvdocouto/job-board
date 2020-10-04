import React from "react";
import { useUserLogin } from "../../hooks/useUserLogin";

export const LoginForm = ({ onLogin }) => {
  const { user, error, handleChange, handleClick } = useUserLogin(onLogin);
  const { email, password } = user;

  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && "Invalid credentials"}</p>
        <div className="control">
          <button className="button is-link" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
};
