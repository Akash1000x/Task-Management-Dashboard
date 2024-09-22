"use client";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import useGetTasks from "@/hooks/useGetTasks";
import TaskList from "@/components/task-list";
import Loader from "@/components/ui/loader";
import NoTasksMessage from "@/components/ui/no-task-message";

export default function Page() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
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
   * if the tasks are fetching from the server
   */
  if (loading) {
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>;
  }

  /**
   * if there are no tasks
   */
  if (noTasks) {
    return <NoTasksMessage />;
  }

  return (
    <div className="max-w-[57rem] mx-auto">
      {tasks.map((task, i) => (
        <TaskList key={i} task={task}></TaskList>
      ))}
    </div>
  );
}
