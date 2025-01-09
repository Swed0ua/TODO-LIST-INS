import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosStart, fetchTodosSuccess } from '../../../store/todosSlice';
import { TodosHandlerInstance } from '../../../handlers/todosHandlers';
import { RootState } from '../../../store/store';
import { TodoList } from './components/TodoList';
import MainBtn from '../../shared/MainBtn';

const TodosContainer: React.FC = () => {
  const dispatch = useDispatch();
  const todoLists = useSelector((state: RootState) => state.todo.todoLists);
  const uid = useSelector((state: RootState) => state.auth.user?.uid);
  const userEmail = useSelector((state: RootState) => state.auth.user?.userEmail);

  const [isAdding, setIsAdding] = useState(false);
  const [newTodoName, setNewTodoName] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(fetchTodosStart());
      try {
        if (userEmail) {
          const todos = await TodosHandlerInstance.getTodoLists(userEmail);
          console.log(todos);

          if (todos.data) dispatch(fetchTodosSuccess(todos.data));
        }
      } catch (error: any) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, [dispatch, userEmail]);

  const handleAddTodoList = async () => {
    if (newTodoName.trim() === '') return; // Перевірка на порожнє значення

    try {
      if (uid) {
        const newTodoList = await TodosHandlerInstance.createTodoList(newTodoName, uid);
        setNewTodoName(''); 
        setIsAdding(false); 
      }
    } catch (error: any) {
      console.error('Failed to create todo list:', error);
    }
  };

  return (
    <div className="todosContainer w-full h-full">
      {userEmail ? (
        <>
          {todoLists.map((item) => (
            <TodoList key={item.id} list={item} userEmail={userEmail} />
          ))}

          {isAdding ? (
            <div className="add-todo-form flex flex-col gap-2 mt-4">
              <input
                type="text"
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
                placeholder="Enter new Todo List name"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <MainBtn onClick={handleAddTodoList}>Add</MainBtn>
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
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add New Todo List
            </button>
          )}
        </>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default TodosContainer;
