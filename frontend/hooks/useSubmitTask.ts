import { toast } from "sonner";
import axios from "axios";
import { ApiUrl } from "@/lib/config";
import useUpateTask from "./useUpdateTask";
import { Priority, Status } from "@/lib/types";
import useGetTasks from "./useGetTasks";

export const useTaskSubmit = () => {
  const { updateTask } = useUpateTask();
  const { getTasks } = useGetTasks();
  const handleSubmit = async (
    title: string,
    description: string,
    status: Status,
    priority: Priority,
    dueDate: Date | undefined,
    editMode: boolean,
    taskId?: string
  ) => {
    try {
      const taskPayload = {
        title,
        description,
        status,
        priority,
        dueDate: dueDate || new Date(),
      };

      if (editMode && taskId) {
        updateTask(taskId, taskPayload);
      } else {
        const response = await axios.post(
          `${ApiUrl}/task/create`,
          { ...taskPayload },
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          toast.success(response.data.message || "Task saved successfully");
          getTasks();
        } else {
          toast.error(response.data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return { handleSubmit };
};
