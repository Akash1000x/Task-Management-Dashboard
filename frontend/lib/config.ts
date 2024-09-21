import { TaskPriority, TaskStatus } from "./types";

export const ApiUrl: string = process.env.NODE_ENV === "production" ? "" : "http://localhost:8000/api/v1";

export const priorityOptions: TaskPriority[] = ["Low", "Medium", "High"];
export const statusOptions: TaskStatus[] = ["To Do", "In Progress", "Completed"];
