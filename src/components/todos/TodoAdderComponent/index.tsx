import React, { useState } from 'react';

interface TodoAdderComponentProps {
    handleAdd: () => void;
    newTaskName: string;
    isAdding: boolean,
    setNewTaskName: (name: string) => void; 
    setIsAdding: (isAdding: boolean) => void;
}

export const TodoAdderComponent: React.FC<TodoAdderComponentProps> = ({ handleAdd, newTaskName, isAdding, setNewTaskName, setIsAdding }) => {

    return (
        <div className="add-task-section mt-4">
            {isAdding ? (
                <div className="add-task-form flex flex-col gap-2">
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Enter new task name"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={()=> handleAdd()}
                            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Task
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add New Task
                </button>
            )}
        </div>
    );
};
