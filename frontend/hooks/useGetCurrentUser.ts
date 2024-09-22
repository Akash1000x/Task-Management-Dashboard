import axios from "axios";
import { ApiUrl } from "@/lib/config";
import { useDispatch } from "react-redux";
import { login } from "@/state/authSlice";

/**
 * fetch the current user
 *
 * @returns {Function} getCurrentUser function to fetch the current user
 */
const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/user/current-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        dispatch(login({ name: response.data.user.name }));
      } else {
        throw new Error("Failed to fetch current user: " + response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { getCurrentUser };
};

export default useGetCurrentUser;
