import axios from "axios";
import { ApiUrl } from "@/lib/config";
import { useDispatch } from "react-redux";
import { login } from "@/state/authSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/user/current-user`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(login({ name: response.data.user.name }));
      } else {
        throw new Error("Failed to fetch current user: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { getCurrentUser };
};

export default useGetCurrentUser;
