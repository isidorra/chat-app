import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../hooks/auth/useLogout";
import { LoaderIcon } from "react-hot-toast";

const Logout = () => {
  const { loading, logout } = useLogout();

  const handleClick = async() => {
    await logout();
  }
  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? (
        <LoaderIcon />
      ) : (
        <div className="flex items-center gap-2 hover:opacity-50 duration-200">
          <TbLogout2 />
          Logout
        </div>
      )}
    </button>
  );
};

export default Logout;
