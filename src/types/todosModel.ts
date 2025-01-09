export interface TodoResult {
  success: boolean;
  data?: TodoListResponce[];
  error?: string;
};

export interface TodoListResponce {
  id: string;
  name: string;
  createdBy?: string;
  tasks: any[];
  users: { [key: string]: string };
}
