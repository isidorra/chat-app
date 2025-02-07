import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useMessagesContext } from "../../context/MessagesContext";

const useCreateMessage = () => {
  const [loading, setLoading] = useState(false);
  const {setMessages} = useMessagesContext();

  const createMessage = async(receiverId, text) => {
    setLoading(true);

    try {
        const response = await axios.post(`/api/messages/send/${receiverId}`, {text});
        if(response.status === 201) {
            setMessages(prev => [...prev, response.data]); 
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

  return {loading, createMessage};
}

export default useCreateMessage