import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { DatePicker } from "./ui/date-picker";
import { Combobox } from "./ui/combobox";
import { Label } from "@radix-ui/react-label";
import { priorityOptions, statusOptions } from "@/lib/config";
import { useTaskSubmit } from "@/hooks/useSubmitTask";
import { Priority, Status } from "@/lib/types";

interface TaskFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editMode?: boolean;
  taskData?: {
    _id?: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate: Date;
  } | null;
}

/**
 * if editMode is false, it will create a new task and if it is true, it will update the task
 */
const TaskForm = (props: TaskFormProps) => {
  const { isDialogOpen, setIsDialogOpen, editMode = false, taskData = null } = props;

  const [title, setTitle] = React.useState(taskData?.title || "");
  const [description, setDescription] = React.useState(taskData?.description || "");
  const [status, setStatus] = React.useState(taskData?.status || "To Do");
  const [priority, setPriority] = React.useState(taskData?.priority || "Medium");
  const [date, setDate] = React.useState<Date | undefined>(taskData?.dueDate || undefined);
  const [isError, setError] = React.useState("");

  const { handleSubmit } = useTaskSubmit();

  /**
   * Handle the form submission and send the form data to the server to create or update the task
   */
  const onSubmit = async () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    await handleSubmit(title, description, status as Status, priority as Priority, date, editMode, taskData?._id);

    setTitle("");
    setDescription("");
    setStatus("To Do");
    setPriority("Medium");
    setDate(undefined);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
          </DialogHeader>
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              placeholder="title"
            />
            {isError && <span className="text-sm font-medium text-destructive">Title is required.</span>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Description"
            />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="statusOptions">Status</Label>
            <Combobox data={statusOptions} value={status} setValue={setStatus} />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="priorityOptions">Priority</Label>
            <Combobox data={priorityOptions} value={priority} setValue={setPriority} />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="date">Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <DialogFooter>
            <Button type="button" onClick={onSubmit}>
              {editMode ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskForm;
