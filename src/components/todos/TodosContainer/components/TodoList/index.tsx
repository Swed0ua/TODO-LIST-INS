import React, { useState } from 'react';
import { TodoListResponce } from '../../../../../types/todosModel';
import { TodosHandlerInstance } from '../../../../../handlers/todosHandlers';
import { TodoItem } from './components/TodoItem';

interface TodoListProps {
    list: TodoListResponce;
    userEmail: string
}

export const TodoList: React.FC<TodoListProps> = ({ list, userEmail }) => {

    let hasAccess = false
    if (list.users[userEmail] && list.users[userEmail] == 'Admin') {
        
        hasAccess = true
    }

    const handleDelete = async () => {
        await TodosHandlerInstance.deleteTodoList(list.id.toString())
    }

    const handleOnDeleteItem = async () => {
        await TodosHandlerInstance.deleteTodoList(list.id.toString())
    }

    const handleOnUpdateItem = async () => {
        await TodosHandlerInstance.deleteTodoList(list.id.toString())
    }

    const handleAddItem = async () => {
        await TodosHandlerInstance.deleteTodoList(list.id.toString())
    }

    return (
        <div className="border p-4 mb-4 rounded-md shadow-sm bg-white">
            <div className="todosList__header flex items-start justify-between h-10">
                <h3 className="text-lg font-semibold mb-2">{list.name}</h3>
                {hasAccess && (<button onClick={handleDelete}>Видалити</button>)}
            </div>
            <div className="todosList__Container">
                {list.tasks.map(({ title, completed, id }) => (<TodoItem key={id} task={{ id, title, completed }} onDelete={handleOnDeleteItem} onUpdate={handleOnUpdateItem} hasAccess={hasAccess} />))}
            </div>
        </div>
    );
};
