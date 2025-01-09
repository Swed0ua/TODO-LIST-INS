import { ToDoService } from "../services/todosService/todosService";
import { TodoResult } from "../types/todosModel";

export class TodosHandler {
    private todosService: ToDoService;

    constructor() {
        this.todosService = new ToDoService();
    }

    async getTodoLists(userId: string): Promise<TodoResult> {
        try {
            const todoLists = await this.todosService.getTodoLists(userId);
            return {
                success: true,
                data: todoLists
            };
        } catch (error: any) {
            console.error('Error getting Todo Lists:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async createTodoList(userId: string, listName: string, userEmail: string): Promise<boolean> {
        try {
            const newList = await this.todosService.createTodoList(userId, listName, userEmail);
            return true;
        } catch (error: any) {
            console.error('Error creating Todo List:', error.message);
            return false;
        }
    }

    async deleteTodoList(todoListId: string): Promise<boolean> {
        try {
            await this.todosService.deleteTodoList(todoListId);
            return true;
        } catch (error: any) {
            console.error('Error deleting Todo List:', error.message);
            return false;
        }
    }

    async addTodoListItem(todoListId: string, itemText:string): Promise<boolean> {
        try {
            await this.todosService.addTodoItem(todoListId, itemText);
            return true;
        } catch (error: any) {
            console.error('Error creating Todo List:', error.message);
            return false;
        }
    }

    async updateTodoItem(todoListId:string, taskId:string, updatedTask:updatedTask): Promise<boolean> {
        try {
            await this.todosService.updateTodoItem(todoListId, taskId, updatedTask);
            return true;
        } catch (error: any) {
            console.error('Error creating Todo List item:', error.message);
            return false;
        }
    }

    async deleteTodoItem(taskId:string, todoListId:string): Promise<boolean> {
        try {
            await this.todosService.deleteTodoItem(taskId, todoListId);
            return true;
        } catch (error: any) {
            console.error('Error deleting Todo List item:', error.message);
            return false;
        }
    }
    

}

export const TodosHandlerInstance = new TodosHandler();
