"use client";
import { Status, Task } from "@/lib/types";
import * as React from "react";
import useUpateTask from "@/hooks/useUpdateTask";
import { statusOptions } from "@/lib/config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setTasks } from "@/state/taskSlice";
import useGetTasks from "@/hooks/useGetTasks";
import TaskCard from "@/components/ui/task-card";
import { CustomDialog } from "@/components/ui/custom-dialog";
import Loader from "@/components/ui/loader";
import NoTasksMessage from "@/components/ui/no-task-message";

export default function Page() {
  const [openCustomDialog, setOpenCustomDialog] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = React.useState<Task | null>(null);
  const { updateTask } = useUpateTask();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { getTasks, loading, noTasks } = useGetTasks();

  /**
   * fetch the tasks from the server when the component is mounted and there are no tasks
   */
  React.useEffect(() => {
    if (tasks.length === 0) {
      getTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * update the status of the task when dropped in the new status column
   *
   * @param event DragEvent
   * @param newStatus new updated status of the task
   */
  const onDrop = (event: React.DragEvent<HTMLDivElement>, newStatus: Status) => {
    event.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      const updatedTask = { ...draggedTask, status: newStatus };
      const updatedTasks = tasks.map((task) => (task._id === draggedTask._id ? updatedTask : task));
      dispatch(setTasks(updatedTasks));
      updateTask(draggedTask._id, updatedTask);
      setDraggedTask(null);
    }
  };

  /**
   * if the tasks are fetching from the server
   */
  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  /**
   * if there are no tasks
   */
  if (noTasks) {
    return <NoTasksMessage />;
  }

  return (
    <div className="flex md:justify-center space-x-2 overflow-auto">
      {statusOptions.map((status, i) => (
        <div
          key={i}
          className="md:w-[300px] min-w-[250px] flex flex-col"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, status as Status)}
        >
          <h3 className="py-2 md:text-xl md:pl-6 text-base pl-4  bg-secondary rounded-sm mb-1">{status}</h3>
          <div className="flex-grow space-y-2 rounded-sm bg-secondary p-1.5">
            {tasks
              .filter((task) => task.status === status)
              .map((task, i) => (
                <TaskCard
                  key={i}
                  task={task}
                  onDragStart={() => setDraggedTask(task)}
                  onClick={() => {
                    setOpenCustomDialog(true);
                    setSelectedTask(task);
                  }}
                />
              ))}
          </div>
        </div>
      ))}
      <CustomDialog task={selectedTask} openCustomDialog={openCustomDialog} setOpenCustomDialog={setOpenCustomDialog} />
    </div>
  );
}
