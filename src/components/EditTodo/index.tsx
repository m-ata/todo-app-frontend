// imports from react
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
// import component
import FormsModal from '@components/FormsModal';
// redux related imports
import { updateTodo } from '@redux/slices/todo.slice';
import { useUpdateTodoMutation } from '@redux/services/todo.service';
// import required interfaces
import {
  IEditTodoProps,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';
import { IFormInputs } from '@interfaces/modal.interface';
// import required utils
import { parseDateToTimestamp } from '@utils/date.util';
import { getApiError } from '@utils/apiError.utils';
// import constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import { EDIT_TODO } from '@/constants/label.constants';

const EditTodo: FC<IEditTodoProps> = ({ onClose, todo }: IEditTodoProps) => {
  const dispatch = useDispatch();
  const [updateTodoMutation] = useUpdateTodoMutation();

  // default values for edit todo form
  const defaultFormValues: IFormInputs = {
    task: todo.task,
    deadline: new Date(+todo.deadline).toISOString().split('T')[0],
  };

  // submit handler for edit todo form
  const submitHandler: SubmitHandler<IFormInputs> = async (
    formData: IFormInputs,
  ) => {
    try {
      const { task, deadline } = formData;
      const updatedTodo: ITodo = {
        ...todo,
        task,
        deadline: parseDateToTimestamp(deadline),
      };
      const { data, error } = (await updateTodoMutation(
        updatedTodo,
      )) as RTKQueryResponse;
      if (data) {
        dispatch(updateTodo(data as ITodo)); // update todo in store
        toast.success(SUCCESS_MESSAGES.UPDATED);
        onClose();
      }
      if (error) toast.error(getApiError(error));
    } catch (err) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
  };

  return (
    <FormsModal
      heading={EDIT_TODO}
      formValues={defaultFormValues}
      onClose={onClose}
      onSubmit={submitHandler}
    />
  );
};

export default EditTodo;
