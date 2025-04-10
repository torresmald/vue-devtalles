export interface Task {
  id: string,
  name: string,
  completedAt: Date | null,
  completed: boolean | undefined
}
