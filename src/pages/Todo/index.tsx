// imports from react
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import components
import Header from '@components/Header';
import TodoList from '@components/TodoList';
//imports from redux
import { useGetTodosQuery } from '@redux/services/todo.service';
import { setTodo } from '@redux/slices/todo.slice';
// import interfaces
import { ITodo, RTKQueryResponse } from '@/interfaces/todo.interface';
// import util
import { getApiError } from '@utils/apiError.utils';
// import style
import './styles.scss';

const Todo = () => {
  // api call using RTK Query to get todos
  const { data, error } = useGetTodosQuery() as RTKQueryResponse;

  const dispatch = useDispatch();

  // componentDidUpdate (data, error)
  useEffect(() => {
    if (data) dispatch(setTodo(data as ITodo[])); // setting todo in store
    // showing error in toast
    if (error) toast.error(getApiError(error));
  }, [data, error]);

  return (
    <div className="container">
      <Header />
      <TodoList />
    </div>
  );
};

export default Todo;
