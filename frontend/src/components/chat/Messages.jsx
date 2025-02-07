import Message from "../chat/Message";
import { useEffect, useRef } from "react";

const Messages = ({messages}) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 

  return (
    <div className="h-full overflow-auto">
      {messages?.map((message) => (
        <Message message={message} key={message._id} />
      ))}
      <div ref={lastMessageRef}></div>
    </div>
  );
}

export default Messages