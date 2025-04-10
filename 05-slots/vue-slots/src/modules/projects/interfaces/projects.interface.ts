import type { Task } from "./tasks.interface";

export interface Project {
  id: string;
  name: string;
  task: Task[];
}
