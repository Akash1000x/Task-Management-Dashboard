export enum Status {
  ToDO = "To Do",
  InProgress = "In Progress",
  Completed = "Completed",
}

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export type TaskStatus = "To Do" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
};
