import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async() => {
    setLoading(true);
    try {
        const response = await axios.post("/api/auth/logout");
        if(response.status === 200) {
            localStorage.removeItem("user");
            setAuthUser(null);
        }

        if (response.data.error) {
            throw new Error(response.data.error);
        }
    } catch(error) {
        toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
        setLoading(false);
    }
  }

  return {loading, logout};
}

export default useLogout