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

    async createTodoList(userId: string, listName: string): Promise<boolean> {
        try {
            const newList = await this.todosService.createTodoList(userId, listName);
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
            console.error('Error creating Todo List:', error.message);
            return false;
        }
    }

    async deleteTodoItem(todoListId: string): Promise<boolean> {
        try {
            await this.todosService.deleteTodoList(todoListId);
            return true;
        } catch (error: any) {
            console.error('Error creating Todo List:', error.message);
            return false;
        }
    }

    async updateTodoItem(todoListId: string): Promise<boolean> {
        try {
            await this.todosService.deleteTodoList(todoListId);
            return true;
        } catch (error: any) {
            console.error('Error creating Todo List:', error.message);
            return false;
        }
    }
    

}

export const TodosHandlerInstance = new TodosHandler();
