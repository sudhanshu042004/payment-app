import { useForm } from "react-hook-form";

const Signup = ({ toggle }) => {
  const { register, handleSubmit } = useForm();
  function postSingup(data) {
    fetch("http://localhost:3000/api/v1/user/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <form onSubmit={handleSubmit((data) => postSingup(data))}>
        <input {...register("firstname")} placeholder="Firstname" />
        <input {...register("lastname")} placeholder="Lastname" />
        <input {...register("username")} placeholder="Username" />
        <input
          {...register("password")}
          placeholder="Create Password"
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
      <div onClick={toggle}>Already have an account? Login </div>
    </div>
  );
};

export default Signup;
