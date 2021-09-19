import axios from "axios";
import React from "react";
import styles from "./styles/signIn.module.css";

const SignInButton = () => {
  const handleClick = async () => {
    const response = await axios.get(`/api/signIn`);
    window.location.href = response.data;
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Sign in with Spotify
    </button>
  );
};

export default SignInButton;
