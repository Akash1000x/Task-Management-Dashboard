import { Request, Response } from "express";
import Task, { Priority, Status } from "../models/task";
import { IUser } from "../models/user";

type Task = {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate }: Task = req.body;
    const user = req.user as IUser["_id"];

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user,
    });

    const savedTask = await task.save();
    res.status(201).json({ savedTask, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId: string = req.params.id;
    const { title, description, status, priority, dueDate }: Task = req.body;
    const task = await Task.findByIdAndUpdate(taskId, { title, description, status, priority, dueDate }, { new: true });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId: string = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
