import React, { useState } from 'react';

interface TodoItemProps {
    task: {
        id: string;
        title: string;
        state: boolean;
    };
    onUpdate: (id: string, updatedTask: updatedTask) => void;
    onDelete: (id: string) => void;
    hasAccess: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onUpdate, onDelete, hasAccess }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.title);

    const handleSave = () => {
        onUpdate(task.id, { title:text });
        setIsEditing(false);
    };

    const toggleCompleted = () => {
        onUpdate(task.id, { state: !task.state });
    };

    return (
        <div className="flex items-center justify-between gap-2 p-2 border rounded-md shadow-sm">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={task.state}
                    onChange={toggleCompleted}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <span
                        className={`flex-1 cursor-pointer ${task.state ? 'line-through text-gray-500' : ''
                            }`}
                        onClick={toggleCompleted}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            {hasAccess && (
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className={`px-3 py-1 text-sm rounded-md ${isEditing
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};
