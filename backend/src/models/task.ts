import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user";

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

interface ITask extends Document {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
  user: IUser["_id"];
}

/**
 * Task Schema
 */
const TaskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(Status), default: Status.ToDO, required: true },
    priority: { type: String, enum: Object.values(Priority), default: Priority.Medium, required: true },
    dueDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
