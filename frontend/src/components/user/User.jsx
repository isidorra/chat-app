import { Link } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";

const User = ({ user }) => {
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(user._id);

  return (
    <Link to={`/chat/${user._id}`} className="flex items-start gap-1 text-sm sm:text-base">
      <p>@{user.username}</p>
      <div
        className={`w-[6px] h-[6px] rounded-full ${
          isOnline ? "bg-accent-green" : "hidden"
        }`}
      ></div>
    </Link>
  );
};

export default User;
