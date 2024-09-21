import HighPriorityIcon from "../icons/high-priority";
import LowPriorityIcon from "../icons/low-priority";
import MediumPriorityIcon from "../icons/medium-priority";
import CustomTooltip from "./custom-tooltip";

const TaskPriority = ({ priority }: { priority: string }) => {
  return (
    <>
      {priority === "High" ? (
        <CustomTooltip content={priority}>
          <HighPriorityIcon />
        </CustomTooltip>
      ) : priority === "Medium" ? (
        <CustomTooltip content={priority}>
          <MediumPriorityIcon />
        </CustomTooltip>
      ) : priority === "Low" ? (
        <CustomTooltip content={priority}>
          <LowPriorityIcon />
        </CustomTooltip>
      ) : null}
    </>
  );
};

export default TaskPriority;
