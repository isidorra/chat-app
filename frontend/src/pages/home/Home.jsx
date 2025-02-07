import ChatCard from "../../components/chat/ChatCard";
import useGetChats from "../../hooks/chat/useGetChats"

const Home = () => {
  const { loading, chats } = useGetChats();

  return (
    <div className="max-container h-screen flex flex-col p-5">
      <h1 className="text-2xl font-medium mb-3">Chats</h1>

      {!loading && chats?.length === 0 && <p className="opacity-70">No chats.</p>}

      <div className="flex-1 overflow-auto">
        {!loading &&
          chats?.length > 0 &&
          chats.map((chat) => (
            <div
              key={chat._id}
              className="border-b border-secondary/50 hover:rounded-md duration-200"
            >
              <ChatCard chat={chat} />
            </div>
          ))}
        
      </div>
    </div>
  );
};

export default Home;
