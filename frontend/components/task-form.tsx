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

const TaskForm = (props: TaskFormProps) => {
  const { isDialogOpen, setIsDialogOpen, editMode = false, taskData = null } = props;

  const [title, setTitle] = React.useState(taskData?.title || "");
  const [description, setDescription] = React.useState(taskData?.description || "");
  const [status, setStatus] = React.useState(taskData?.status || "To Do");
  const [priority, setPriority] = React.useState(taskData?.priority || "Medium");
  const [date, setDate] = React.useState<Date | undefined>(taskData?.dueDate || undefined);

  const { handleSubmit } = useTaskSubmit();

  const onSubmit = async () => {
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
            <Label htmlFor="name">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="name" placeholder="title" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="name"
              placeholder="Description"
            />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="name">Status</Label>
            <Combobox data={statusOptions} value={status} setValue={setStatus} />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="name">Priority</Label>
            <Combobox data={priorityOptions} value={priority} setValue={setPriority} />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="name">Date</Label>
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
