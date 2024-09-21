import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/lib/types";
import { format } from "date-fns";
import TaskPriority from "./task-priority";
import CustomTooltip from "./custom-tooltip";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Button } from "./button";
import useDeleteTask from "@/hooks/useDeleteTask";

interface CustomDialogProps {
  task: Task | null;
  openCustomDialog: boolean;
  setOpenCustomDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTask?: boolean;
}

export function CustomDialog({
  task,
  openCustomDialog,
  setOpenCustomDialog,
  deleteTask: shouldDeleteTask = false,
}: CustomDialogProps) {
  const user = useSelector((state: RootState) => state.auth);
  const { deleteTask } = useDeleteTask();

  return (
    <>
      {task && (
        <Dialog open={openCustomDialog} onOpenChange={setOpenCustomDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="capitalize">{task.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{task.description}</DialogDescription>
            <div className="space-y-2 flex justify-between items-center">
              <div>{format(new Date(task.dueDate), "PP")}</div>
              <div className="flex gap-4 items-center">
                <TaskPriority priority={task.priority || ""} />
                <CustomTooltip content={user.name as string}>
                  <div className="rounded-full bg-foreground text-background text-xs font-thin w-7 h-7 flex justify-center items-center">
                    {user.name?.slice(0, 2).toUpperCase()}
                  </div>
                </CustomTooltip>
              </div>
            </div>
            {shouldDeleteTask && (
              <DialogFooter>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    deleteTask(task._id);
                    setOpenCustomDialog(false);
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
