import React, { useState } from 'react';
import { TodoListResponce } from '../../../../../types/todosModel';
import { TodosHandlerInstance } from '../../../../../handlers/todosHandlers';
import { TodoItem } from './components/TodoItem';
import { TodoAdderComponent } from '../../../TodoAdderComponent';

interface TodoListProps {
    list: TodoListResponce;
    userEmail: string;
    fetchTodos: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ list, userEmail, fetchTodos }) => {
    const [newTaskName, setNewTaskName] = useState(''); 
    const [isAdding, setIsAdding] = useState(false); 

    let hasAccess = false;
    if (list.users[userEmail] && list.users[userEmail] === 'Admin') {
        hasAccess = true;
    }

    const handleDelete = async () => {
        await TodosHandlerInstance.deleteTodoList(list.id.toString())
        fetchTodos()
    };

    const handleOnDeleteItem = async (itemId:string) => {
        try {
            const newTask = await TodosHandlerInstance.deleteTodoItem(itemId, list.id.toString());
            setNewTaskName('');
            setIsAdding(false);
            list.tasks.push(newTask);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
        fetchTodos()
    };

    const handleOnUpdateItem = async (itemId: string, data: updatedTask) => {
        try {
            const newTask = await TodosHandlerInstance.updateTodoItem(list.id.toString(), itemId, data );
            setNewTaskName('');
            setIsAdding(false);
            list.tasks.push(newTask);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
        fetchTodos()
    };

    const handleAddItem = async () => {
        if (newTaskName.trim() === '') return; 

        try {
            const newTask = await TodosHandlerInstance.addTodoListItem(list.id.toString(), newTaskName);
            setNewTaskName(''); 
            setIsAdding(false); 
            list.tasks.push(newTask); 
        } catch (error) {
            console.error('Failed to add task:', error);
        }
        fetchTodos()
    };

    return (
        <div className="border p-4 mb-4 rounded-md shadow-sm bg-white">
            <div className="todosList__header flex items-start justify-between h-10">
                <h3 className="text-lg font-semibold mb-2">{list.name}</h3>
                {hasAccess && <button onClick={handleDelete}>Delete</button>}
            </div>
            <div className="todosList__Container">
                {list.tasks.map(({ title, state, id }) => (
                    <TodoItem
                        key={id}
                        task={{ id, title, state }}
                        onDelete={handleOnDeleteItem}
                        onUpdate={handleOnUpdateItem}
                        hasAccess={hasAccess}
                    />
                ))}

                {hasAccess && (
                    <TodoAdderComponent handleAdd={handleAddItem} isAdding={isAdding} newTaskName={newTaskName} setIsAdding={setIsAdding} setNewTaskName={setNewTaskName} />
                )}
            </div>
        </div>
    );
};
