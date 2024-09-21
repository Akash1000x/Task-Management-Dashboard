import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setTasks } from "@/state/taskSlice";

export const useTaskFilter = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const sortByStatus = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const statusOrder = ["To Do", "In Progress", "Completed"];
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
    dispatch(setTasks(sortedTasks));
  };

  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = ["High", "Medium", "Low"];
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });
    dispatch(setTasks(sortedTasks));
  };

  const sortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    dispatch(setTasks(sortedTasks));
  };

  return {
    sortByStatus,
    sortByPriority,
    sortByDate,
  };
};
