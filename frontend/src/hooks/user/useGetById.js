import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetById = (id) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getById = async () => {
      try {
        const response = await axios.get(`/api/users/find/${id}`);
        if (response.status === 200) {
          setUser(response.data);
        }

        if (response.data.error) {
          throw new Error(response.data.error);
        }

      } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getById();
  }, [id]);

  return {loading, user};
};

export default useGetById;
