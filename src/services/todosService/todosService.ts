import { db } from "../../firebase/firebase-config";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { TodoListResponce } from "../../types/todosModel";
import { v4 as uuidv4 } from 'uuid';

export class ToDoService {
    private todoListsCollection = collection(db, "todos");

    async createTodoList(name: string, userId: string): Promise<void> {
        try {
            const newDocRef = doc(this.todoListsCollection);
            await setDoc(newDocRef, {
                id: newDocRef.id,
                name,
                createdBy: userId,
                users: {
                    [userId]: "Admin" 
                },
                tasks: []
            });
        } catch (error: any) {
            throw new Error("Failed to create To-Do List: " + error.message);
        }
    }

    async getTodoLists(userId: string): Promise<TodoListResponce[]> {

        try {
            const querySnapshot = await getDocs(this.todoListsCollection);
            const todoLists = querySnapshot.docs
                .map((doc) => doc.data() as TodoListResponce)
                .filter((list: any) => list.users && list.users[userId]); 
            return todoLists;
        } catch (error: any) {
            throw new Error("Failed to fetch To-Do Lists: " + error.message);
        }
    }

    async addTask(todoListId: string, task: { id: string; name: string; completed: boolean }): Promise<void> {
        try {
            const todoListRef = doc(this.todoListsCollection, todoListId);
            await updateDoc(todoListRef, {
                tasks: arrayUnion(task)
            });
        } catch (error: any) {
            throw new Error("Failed to add task: " + error.message);
        }
    }

    async removeTask(todoListId: string, task: { id: string; name: string; completed: boolean }): Promise<void> {
        try {
            const todoListRef = doc(this.todoListsCollection, todoListId);
            await updateDoc(todoListRef, {
                tasks: arrayRemove(task)
            });
        } catch (error: any) {
            throw new Error("Failed to remove task: " + error.message);
        }
    }

    async toggleTaskStatus(todoListId: string, taskId: string, completed: boolean): Promise<void> {
        try {
            const todoListRef = doc(this.todoListsCollection, todoListId);
            const todoListDoc = await getDoc(todoListRef);

            if (todoListDoc.exists()) {
                const data = todoListDoc.data();
                const tasks = data.tasks.map((task: any) =>
                    task.id === taskId ? { ...task, completed } : task
                );

                await updateDoc(todoListRef, { tasks });
            } else {
                throw new Error("To-Do List not found");
            }
        } catch (error: any) {
            throw new Error("Failed to update task status: " + error.message);
        }
    }

    async addUserAccess(todoListId: string, userId: string, role: "Admin" | "Viewer"): Promise<void> {
        try {
            const todoListRef = doc(this.todoListsCollection, todoListId);
            await updateDoc(todoListRef, {
                [`users.${userId}`]: role
            });
        } catch (error: any) {
            throw new Error("Failed to add user access: " + error.message);
        }
    }

    async removeUserAccess(todoListId: string, userId: string): Promise<void> {
        try {
            const todoListRef = doc(this.todoListsCollection, todoListId);
            await updateDoc(todoListRef, {
                [`users.${userId}`]: deleteDoc 
            });
        } catch (error: any) {
            throw new Error("Failed to remove user access: " + error.message);
        }
    }

    async deleteTodoList(todoListId: string): Promise<void> {
        try {
            const todoListRef = doc(this.todoListsCollection, todoListId);
            await deleteDoc(todoListRef);
        } catch (error: any) {
            throw new Error("Failed to delete To-Do List: " + error.message);
        }
    }

    async updateTodoItem(): Promise<void> {
        try {
            
        } catch (error: any) {
        }
    }

    async addTodoItem(todoListId:string, taskTitle:string): Promise<void> {
        try {
            const todoListRef = doc(db, "todos", todoListId);
            await updateDoc(todoListRef, {
                tasks: arrayUnion({
                    title: taskTitle,
                    state: false,
                    id: uuidv4()
                }),
            });
            
        } catch (error: any) {
            throw new Error("Failed to add new list item: " + error.message);
        }
    }

    async deleteTodoItem(): Promise<void> {
        try {
            
        } catch (error: any) {
        }
    }
}
