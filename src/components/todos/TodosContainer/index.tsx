import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosStart, fetchTodosSuccess} from '../../../store/todosSlice';
import { TodosHandlerInstance } from '../../../handlers/todosHandlers';
import { RootState } from '../../../store/store';
import { TodoList } from './components/TodoList';

const TodosContainer: React.FC = () => {
  const dispatch = useDispatch()
  const todoLists = useSelector((state: RootState) => state.todo.todoLists);
  const uid = useSelector((state: RootState) => state.auth.user?.uid);
  const userEmail = useSelector((state: RootState) => state.auth.user?.userEmail);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(fetchTodosStart());
      try {
        if (uid) {
          const todos = await TodosHandlerInstance.getTodoLists(uid);
          console.log(todos)
          
          if (todos.data)
            dispatch(fetchTodosSuccess(todos.data));
        }
      } catch (error: any) {
        
      }
    };

    fetchTodos();
  }, [dispatch]);

  useEffect(() => {
  }, [todoLists])

  return (
      <div className="todosContainer w-full h-full">
      {userEmail ? (todoLists.map((item) => (<TodoList key={item.id} list={item} userEmail={userEmail} />))) : (<div>Error</div>)}
    </div>
  );
};

export default TodosContainer
