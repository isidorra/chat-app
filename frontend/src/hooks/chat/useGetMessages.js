import { useEffect, useState } from "react"
import {useMessagesContext} from "../../context/MessagesContext";
import axios from "axios";
import toast from "react-hot-toast";


const useGetMessages = (receiverId) => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages} = useMessagesContext();

  useEffect(() => {
    const getMessages = async() => {
        setLoading(true);

        try {
            const response = await axios.get(`/api/messages/${receiverId}`);
            if(response.status === 200) {
                setMessages(response.data);
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

    getMessages();
  }, [receiverId, setMessages]);

  return {loading, messages};
}

export default useGetMessages