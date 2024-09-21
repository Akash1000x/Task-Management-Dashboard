"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "./ui/combobox";
import { useTaskFilter } from "@/hooks/useTaskFilter";
import TaskForm from "./task-form";

export default function CustomTabBar() {
  const [filterOption, setFilterOption] = React.useState<string>("");
  const [isDialogOpe, setIsDialogOpe] = React.useState<boolean>(false);
  const filterOptions = ["status", "priority", "date"];

  const { sortByDate, sortByStatus, sortByPriority } = useTaskFilter();

  React.useEffect(() => {
    if (filterOption === "date") {
      sortByDate();
    } else if (filterOption === "priority") {
      sortByPriority();
    } else if (filterOption === "status") {
      sortByStatus();
    }
  }, [filterOption]);

  return (
    <>
      <div className="flex justify-between sm:pb-4 pb-2">
        <div className="flex font-bold gap-4 items-center">
          <Combobox data={filterOptions} value={filterOption} setValue={setFilterOption} />
        </div>
        <Button onClick={() => setIsDialogOpe(true)}>Create Task</Button>
      </div>
      {isDialogOpe && <TaskForm isDialogOpen={isDialogOpe} setIsDialogOpen={setIsDialogOpe} />}
    </>
  );
}
