import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/user";
import api from "../services/api";

const useUserData = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) throw new Error("No username found");

        const response = await api.get(`profile/${username}`);
        setUser(response.data);
      } catch (err : any) {
        console.log(typeof err);
        // if (typeof err === "string") {
        //   {err}setError(err);
        // }else {
        //   setError("unknown error");
        // }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const updateUser = async (updatedUser: any) => {
    try {
      const response = await api.put(`/users/${updatedUser.username}`, updatedUser);
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return { user, isLoading, error, updateUser };
};

export default useUserData;