import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useSearch from "../../hooks/user/useSearch";
import { LoaderIcon } from "react-hot-toast";
import User from "../../components/user/User";

const Search = () => {
  const [query, setQuery] = useState("");
  const { loading, search, users } = useSearch(query);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await search(query);
  };

  return (
    <div className="max-container p-5">
      <h1 className="text-2xl font-medium">Search</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 justify-between my-3"
      >
        <input
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Search people to chat with"
          type="text"
          className="w-full border border-secondary rounded-md p-2 focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        />
        <button
          disabled={loading}
          className="bg-accent-purple hover:bg-accent-purple/50 duration-200 p-3 rounded-md focus:outline-1 focus:outline-offset-2 focus:outline-accent-purple"
        >
          {loading ? <LoaderIcon /> : <IoSearch />}
        </button>
      </form>

      {!loading && users?.length === 0 && <p className="opacity-70">No users found.</p>}
      {!loading &&
        users &&
        users.map((user) => 
            <div key={user._id} className="border-b border-secondary/50 py-5">
                <User user={user}/>
            </div>
        )}
    </div>
  );
};

export default Search;
