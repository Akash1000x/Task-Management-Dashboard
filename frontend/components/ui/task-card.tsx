import { Task } from "@/lib/types";
import { format } from "date-fns";
import CustomTooltip from "./custom-tooltip";
import TaskPriority from "./task-priority";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onClick }) => {
  const user = useSelector((state: RootState) => state.auth);
  return (
    <div
      className="border bg-background rounded-sm p-3 relative cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onClick={onClick}
    >
      <h4 className="md:text-base text-sm capitalize">{task.title}</h4>
      <p className="text-nowrap text-[13px] font-thin text-muted-foreground overflow-hidden pb-2">{task.description}</p>
      <div className="flex justify-between">
        <div className="text-[13px]">{format(new Date(task.dueDate), "PP")}</div>
        <div className="flex gap-2">
          <TaskPriority priority={task.priority} />
          <CustomTooltip content={user.name as string}>
            <div className="rounded-full bg-foreground text-background text-xs font-thin w-7 h-7 flex justify-center items-center">
              {user.name?.slice(0, 2).toUpperCase()}
            </div>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
