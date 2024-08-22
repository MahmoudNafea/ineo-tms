import { Timestamp } from "rxjs";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt:Date;
  }

  export enum TaskStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
  }