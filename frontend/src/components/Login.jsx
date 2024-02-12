import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
const Login = ({ toggle }) => {
  const { register, handleSubmit } = useForm();
  function postSiginData(data) {
    fetch("http://localhost:3000/api/v1/user/signin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => Cookies.set("token", res.token, { sameSite: "strict" }))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit((data) => postSiginData(data))}>
          <input {...register("username")} placeholder="Username" />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Submit</button>
        </form>
        <div onClick={toggle}>create an account? Signup</div>
      </div>
    </>
  );
};

export default Login;
