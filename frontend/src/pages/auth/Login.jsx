import { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";
import toast from "react-hot-toast";
import { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading, login} = useLogin();

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    const success = await login(email, password);
    if(success) toast.success("Welcome back!");
  }
  return (
    <div className="max-w-[500px] mx-auto w-full p-3">
      <h1 className="text-2xl font-medium mt-16">Log in to your account</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <label className="uppercase text-sm ">Email</label>
        <input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          type="email"
          className="bg-transparent border border-secondary p-2 rounded-md block w-full mb-4 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        />

        <label className="uppercase text-sm ">Password</label>
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          className="bg-transparent border border-secondary p-2 rounded-md block w-full mb-4 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        />

        <button disabled={loading} className="bg-accent-purple w-full p-2 rounded-md hover:bg-accent-green duration-200 hover:text-primary focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple">
         {loading ? <LoaderIcon className="mx-auto" /> : <span>Log in</span>}
        </button>
      </form>
    </div>
  );
};

export default Login;
