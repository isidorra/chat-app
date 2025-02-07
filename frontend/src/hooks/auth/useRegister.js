import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import {useAuthContext} from "../../context/AuthContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const register = async(username, email, password, confirmPassword) => {
    if(!validateInputs(username, email, password, confirmPassword)) return;

    setLoading(true);
    try {
        const response = await axios.post("/api/auth/register", {username, email, password, confirmPassword});
        if(response.status === 201) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setAuthUser(response.data);
            return true;
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

  return {loading, register};
}

const validateInputs = (username, email, password, confirmPassword) => {
    if(!username || !email || !password || !confirmPassword) {
        toast.error("All fields are required");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return false;
    }

    if(password.length < 7) {
        toast.error("Password must have at least 7 characters.");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Passwords must match.");
        return false;
    }

    return true;
}

export default useRegister