import React, { useState } from 'react';

interface TodoListProps {
    list: {
        id: string;
        name: string;
    };
}

export const TodoList: React.FC<TodoListProps> = ({list}) => {

    return (
        <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '16px' }}>
            <h3>{list.name}</h3>
        </div>
    );
};
