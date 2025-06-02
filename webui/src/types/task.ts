export interface Task {
  id: number;
  name: string;
  desc?: string;
  stage: number;
};

export type CreateTask = Omit<Task, 'id'>;