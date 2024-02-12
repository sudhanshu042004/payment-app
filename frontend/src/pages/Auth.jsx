import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
  const [login, setLogin] = useState(true);
  function toggle() {
    setLogin((login) => !login);
  }

  return (
    <>
      <div className="">
        {login ? <Login toggle={toggle} /> : <Signup toggle={toggle} />}
      </div>
    </>
  );
};

export default Auth;
