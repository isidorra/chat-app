import { useState } from "react";
import useRegister from "../../hooks/auth/useRegister";
import toast, { LoaderIcon } from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, register } = useRegister();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const success = await register(username, email, password, confirmPassword);
    if (success) toast.success("Successfull registration!");
  };
  return (
    <div className="max-w-[500px] p-5 mx-auto w-full">
      <h1 className="text-2xl font-medium mt-16">Create an account</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <label className="uppercase text-sm">Username</label>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          className="bg-transparent border border-secondary p-2 rounded-md block w-full mb-4 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        />

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

        <label className="uppercase text-sm ">Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          type="password"
          className="bg-transparent border border-secondary p-2 rounded-md block w-full mb-4 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        />

        <button
          disabled={loading}
          className="bg-accent-purple w-full p-2 rounded-md hover:bg-accent-green duration-200 hover:text-primary focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        >
          {loading ? <LoaderIcon className="mx-auto" /> : <span>Register</span>}
        </button>
      </form>
    </div>
  );
};

export default Register;
