import Cookies from "js-cookie";
import React, { useState } from "react";

const SearchUser = () => {
  const [users, setUsers] = useState({});

  function handleChange(input) {
    console.log(input);
    fetch(`http://localhost:3000/api/v1/user/bulk?filter=har`, {
      headers: {
        authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => setUsers(res.user))
      .catch((er) => console.log(er));
  }
  return (
    <>
      <div>search</div>
      <input onChange={(e) => handleChange(e.target.value)} />
    </>
  );
};

export default SearchUser;
