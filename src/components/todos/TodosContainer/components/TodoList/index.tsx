import React, { useState } from 'react';
import { TodoListResponce } from '../../../../../types/todosModel';
import { TodosHandlerInstance } from '../../../../../handlers/todosHandlers';
import { TodoItem } from './components/TodoItem';
import { TodoAdderComponent } from '../../../TodoAdderComponent';

interface TodoListProps {
    list: TodoListResponce;
    userEmail: string;
}

export const TodoList: React.FC<TodoListProps> = ({ list, userEmail }) => {
    const [newTaskName, setNewTaskName] = useState(''); 
    const [isAdding, setIsAdding] = useState(false); 

    let hasAccess = false;
    if (list.users[userEmail] && list.users[userEmail] === 'Admin') {
        hasAccess = true;
    }

    const handleDelete = async () => {
        // await TodosHandlerInstance.deleteTodoList(list.id.toString())
    };

    const handleOnDeleteItem = async () => {
        // Реалізація видалення завдання
    };

    const handleOnUpdateItem = async () => {
        // Реалізація оновлення завдання
    };

    const handleAddItem = async () => {
        if (newTaskName.trim() === '') return; // Перевірка, щоб назва не була порожньою

        try {
            const newTask = await TodosHandlerInstance.addTodoListItem(list.id.toString(), newTaskName);
            setNewTaskName(''); // Очистка поля вводу
            setIsAdding(false); // Закриття форми
            list.tasks.push(newTask); // Оновлення локального списку завдань
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <div className="border p-4 mb-4 rounded-md shadow-sm bg-white">
            <div className="todosList__header flex items-start justify-between h-10">
                <h3 className="text-lg font-semibold mb-2">{list.name}</h3>
                {hasAccess && <button onClick={handleDelete}>Delete</button>}
            </div>
            <div className="todosList__Container">
                {list.tasks.map(({ title, completed, id }) => (
                    <TodoItem
                        key={id}
                        task={{ id, title, completed }}
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
