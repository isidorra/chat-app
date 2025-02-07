import { useParams } from "react-router-dom";
import useGetMessages from "../../hooks/chat/useGetMessages";
import Header from "../../components/chat/Header";
import Messages from "../../components/chat/Messages";
import NewMessage from "../../components/chat/NewMessage";
import { LoaderIcon } from "react-hot-toast";
import useListenMessages from "../../hooks/socket/useListenMessages";


const Chat = () => {
    const { receiverId } = useParams();
    const { loading, messages } = useGetMessages(receiverId);
    useListenMessages();
  
    return (
      <div className="max-container p-3 sm:p-5 h-full flex flex-col">
        <Header receiverId={receiverId} />
  
        <div className="flex-1 overflow-auto p-3 sm:p-5">
          {loading && <LoaderIcon />}
          {!loading && messages?.length === 0 && <p>No messages.</p>}
          {!loading && messages?.length > 0 && <Messages messages={messages} />}
        </div>
  
        <NewMessage receiverId={receiverId}/>
      </div>
    );
  };
  
  export default Chat;
  
