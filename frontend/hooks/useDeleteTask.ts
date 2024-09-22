import axios from "axios";
import { ApiUrl } from "@/lib/config";
import { toast } from "sonner";
import useGetTasks from "./useGetTasks";

/**
 * Delete the task with the given task id
 *
 * @returns {Function} deleteTask function to delete the task
 */
const useDeleteTask = () => {
  const { getTasks } = useGetTasks();
  const deleteTask = async (taskId: string) => {
    try {
      const response = await axios.put(
        `${ApiUrl}/task/delete/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.status === 200) {
        getTasks();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to Delete task");
      console.error("Failed to Delete task:", error);
    }
  };

  return { deleteTask };
};

export default useDeleteTask;
