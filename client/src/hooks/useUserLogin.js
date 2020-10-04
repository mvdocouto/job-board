import { useState } from "react";
import { login } from "../auth";

export const useUserLogin = (onLogin) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const auxValues = { ...user };
    auxValues[event.target.name] = event.target.value;
    setUser(auxValues);
  };
  const handleClick = (event) => {
    event.preventDefault();
    const { email, password } = user;
    login(email, password).then((ok) => {
      if (ok) {
        onLogin();
      } else {
        setError({ error: true });
      }
    });
  };

  return {
    user,
    error,
    handleChange,
    handleClick,
  };
};
