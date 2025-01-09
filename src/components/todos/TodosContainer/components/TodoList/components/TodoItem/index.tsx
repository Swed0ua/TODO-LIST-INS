import React, { useState } from 'react';

interface TodoItemProps {
    task: {
        id: string;
        text: string;
        completed: boolean;
    };
    onUpdate: (id: string, updatedTask: { text?: string; completed?: boolean }) => void;
    onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);

    const handleSave = () => {
        onUpdate(task.id, { text });
        setIsEditing(false);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
            ) : (
                <span
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        flex: 1,
                        cursor: 'pointer',
                    }}
                    onClick={() => onUpdate(task.id, { completed: !task.completed })}
                >
                    {task.text}
                </span>
            )}

            <button onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};
