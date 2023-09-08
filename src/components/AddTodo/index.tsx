import { FC } from 'react';
import { IAddTodoProps, ITodo } from '@interfaces/todo.interface';
import { useDispatch } from 'react-redux';
import { addTodo } from '@redux/slices/todo.slice';
import FormsModal from '@components/FormsModal';
import { IFormInputs } from '@/interfaces/modal.interface';
import { SubmitHandler } from 'react-hook-form';
import { parseDateToTimestamp } from '@utils/date.util';

const AddTodo: FC<IAddTodoProps> = ({ onClose }: IAddTodoProps) => {
  const dispatch = useDispatch();

  const defaultFormValues: IFormInputs = {
    task: '',
    deadline: new Date(+Date.now()).toISOString().split('T')[0],
  };

  const submitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    const { task, deadline } = data;
    const todo: ITodo = {
      id: Math.random().toString(36).substring(2, 9),
      task,
      deadline: parseDateToTimestamp(deadline),
      isCompleted: false,
    };
    dispatch(addTodo(todo));
    onClose();
  };

  return (
    <FormsModal
      heading="Add Todo"
      formValues={defaultFormValues}
      onClose={onClose}
      onSubmit={submitHandler}
    />
  );
};

export default AddTodo;
