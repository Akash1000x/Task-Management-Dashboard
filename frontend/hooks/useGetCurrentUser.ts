import axios from "axios";
import { ApiUrl } from "@/lib/config";
import { useDispatch } from "react-redux";
import { login } from "@/state/authSlice";
import { useRouter } from "next/navigation";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/user/current-user`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(login({ name: response.data.user.name }));
      } else {
        router.push("/sign-in");
      }
    } catch (err) {
      router.push("/sign-in");
      console.error(err);
    }
  };

  return { getCurrentUser };
};

export default useGetCurrentUser;
