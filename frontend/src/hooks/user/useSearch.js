import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

 
    const search = async(query) => {
        if(!query) {
            toast.error("Please enter search field.");
            return;
        }
    
        setLoading(true);
        try {
            const response = await axios.get(`/api/users/search?query=${query}`);
            if(response.status === 200) {
                setUsers(response.data);
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


  return {loading, search, users};


}

export default useSearch