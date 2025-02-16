import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosStart, fetchTodosSuccess } from '../../../store/todosSlice';
import { TodosHandlerInstance } from '../../../handlers/todosHandlers';
import { RootState } from '../../../store/store';
import { TodoList } from './components/TodoList';
import MainBtn from '../../shared/MainBtn';
import { TodoAdderComponent } from '../TodoAdderComponent';

const TodosContainer: React.FC = () => {
  const dispatch = useDispatch();
  const todoLists = useSelector((state: RootState) => state.todo.todoLists);
  const uid = useSelector((state: RootState) => state.auth.user?.uid);
  const userEmail = useSelector((state: RootState) => state.auth.user?.userEmail);

  const [isAdding, setIsAdding] = useState(false);
  const [newTodoName, setNewTodoName] = useState('');

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

  useEffect(() => {
    fetchTodos();
  }, [dispatch, userEmail]);

  const handleAddTodoList = async () => {
    if (newTodoName.trim() === '') return;

    try {
      if (uid && userEmail) {
        const newTodoList = await TodosHandlerInstance.createTodoList(newTodoName, uid, userEmail);
        setNewTodoName(''); 
        setIsAdding(false); 
        fetchTodos()
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
            <TodoList key={item.id} list={item} userEmail={userEmail} fetchTodos={fetchTodos} />
          ))}

          {isAdding ? (
            <TodoAdderComponent handleAdd={handleAddTodoList} newTaskName={newTodoName} setNewTaskName={setNewTodoName} isAdding={isAdding} setIsAdding={setIsAdding} />
          ) : (
            <MainBtn addClassName={"mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"} onClick={() => setIsAdding(true)}>Add New Todo List</MainBtn>
          )}
        </>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default TodosContainer;
