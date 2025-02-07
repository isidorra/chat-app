import {useSocketContext} from "../../context/SocketContext";
import {useMessagesContext} from "../../context/MessagesContext";
import { useEffect } from "react";

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useMessagesContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        setMessages([...messages, newMessage]);
    })

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
}

export default useListenMessages