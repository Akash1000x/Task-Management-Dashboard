import axios from "axios";
import { Task } from "@/lib/types";
import { ApiUrl } from "@/lib/config";
import { toast } from "sonner";
import useGetTasks from "./useGetTasks";

/**
 * Handles updating a task
 *
 * @returns {Function} updateTask - Function to update the task
 */
const useUpateTask = () => {
  const { getTasks } = useGetTasks();
  const updateTask = async (taskId: string, task: Omit<Task, "_id">) => {
    try {
      const response = await axios.put(
        `${ApiUrl}/task/update/${taskId}`,
        { ...task },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        getTasks();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update task status");
      console.error("Failed to update task status:", error);
    }
  };

  return { updateTask };
};

export default useUpateTask;
