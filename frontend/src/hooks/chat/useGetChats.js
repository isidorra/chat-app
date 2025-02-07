import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/chats");
            
            if(response.status === 200) {
                setChats(response.data);
            }

            if(response.data.error) {
                throw new Error(response.data.error);
            } 
        } catch(error) {
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    getChats();
  }, [])

  return {loading, chats};
}

export default useGetChats