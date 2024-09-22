import * as React from "react";
import axios from "axios";
import { Task } from "@/lib/types";
import { ApiUrl } from "@/lib/config";
import { useDispatch } from "react-redux";
import { setTasks } from "@/state/taskSlice";

const useGetTasks = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [noTasks, setNoTasks] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ApiUrl}/task/get-tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        if (response.data.tasks.length === 0) {
          setNoTasks(true);
        }
        dispatch(setTasks(response.data.tasks as Task[]));
      } else {
        throw new Error("Failed to fetch tasks", response.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getTasks, noTasks };
};

export default useGetTasks;
