"use client";
import React from "react";
import TaskPriority from "./ui/task-priority";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import TaskForm from "./task-form";
import { Task } from "@/lib/types";
import { CustomDialog } from "./ui/custom-dialog";

interface TaskListProps {
  task: Task;
}

const TaskList = ({ task }: TaskListProps) => {
  const [selectTask, setSelectTask] = React.useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center gap-2  py-2 sm:px-3 px-1 border-b first-of-type:border-t hover:bg-muted/50">
        <div className="w-3/4">
          <div className="flex justify-between">
            <h4 className="sm:text-base text-sm font-semibold sm:font-medium capitalize">{task.title}</h4>
            <span className="sm:text-sm text-xs text-muted-foreground">{format(new Date(task.dueDate), "PP")}</span>
          </div>
          <p className="text-sm text-muted-foreground pb-2 text-justify">{task.description}</p>
        </div>
        <div className="flex sm:gap-4 gap-1 items-center">
          <TaskPriority priority={task.priority} />
          <div
            onClick={() => {
              setIsEditDialogOpen(true);
              setSelectTask(task);
            }}
            className="flex justify-center items-center rounded-full w-6 h-6 sm:w-9 sm:h-9 bg-secondary cursor-pointer"
          >
            <Pencil className="sm:w-[18px] sm:h-[18px] w-3.5 h-3.5" />
          </div>
          <Trash2
            className="sm:w-6 sm:h-6 w-4 h-4 cursor-pointer"
            onClick={() => {
              setIsDeleteDialogOpen(true);
              setSelectTask(task);
            }}
          />
        </div>
      </div>
      {isEditDialogOpen && (
        <TaskForm
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
          editMode={true}
          taskData={selectTask}
        />
      )}
      {isDeleteDialogOpen && (
        <CustomDialog
          openCustomDialog={isDeleteDialogOpen}
          setOpenCustomDialog={setIsDeleteDialogOpen}
          task={selectTask}
          deleteTask={true}
        />
      )}
    </>
  );
};

export default TaskList;
