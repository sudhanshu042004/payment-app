import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const useApiData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/account/balance", {
      headers: {
        authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);
  return { data, loading };
};

export default useApiData;
