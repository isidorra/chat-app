import { useState } from "react";
import { LuSend } from "react-icons/lu";
import useCreateMessage from "../../hooks/chat/useCreateMessage";
import { LoaderIcon } from "react-hot-toast";

const NewMessage = ({receiverId}) => {
  const [text, setText] = useState("");
  const {loading, createMessage} = useCreateMessage();

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    const success = await createMessage(receiverId, text);
    if(success) {
      setText("");
    }
  }
  return (
    <div className="mt-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-between my-3">
        <input value={text} onChange={ev => setText(ev.target.value)} type="text" placeholder="New Message" className="w-full block border border-secondary rounded-md p-1 sm:p-2 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"/>
        <button disabled={loading} className="p-2 sm:py-2 sm:px-1 w-fit flex items-center gap-2 rounded-md bg-accent-purple/50  hover:bg-accent-purple duration-200 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple">
          {loading ? <LoaderIcon/> : <><LuSend />
            <span className="text-nowrap hidden sm:block">Send Message</span></>}
        </button>
      </form>
    </div>
  );
};

export default NewMessage;
