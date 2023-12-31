import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface ITodo {
  id?: number;
  task: string;
  deadline: string;
  isCompleted: boolean;
}

export interface IAddTodoProps {
  onClose: () => void;
}

export interface IEditTodoProps extends IAddTodoProps {
  todo: ITodo;
}

export interface ICardProps {
  data: ITodo[];
  // eslint-disable-next-line no-unused-vars
  handleUpsert: (todo: ITodo, upsertType: string) => void;
  isMobile: boolean;
}

export interface ITableProps extends ICardProps {
  columns: string[];
}

export interface ITodoItem {
  todo: ITodo;
  isMobile?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleUpsert: (todo: ITodo, upsertType: string) => void;
}

export interface IUseStatusProps {
  todo: ITodo;
}

export interface IDeleteResponse {
  success: boolean;
  id: number;
}

export interface RTKQueryResponse {
  data: ITodo | ITodo[] | IDeleteResponse;
  error: FetchBaseQueryError;
  isLoading: boolean;
}
