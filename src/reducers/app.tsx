import { ITodoItem } from '../types/app'
import { Action, handleAction } from 'redux-actions'
import { AppActionType } from '../actions/app'

export interface AppState {
  todos: ITodoItem[]
}

const initialState: AppState = {
  todos: [],
}

export const appReducer = handleAction(
  AppActionType.setTodoList,
  (state: AppState, action: Action<ITodoItem[]>) => ({
    todos: action.payload,
  }),
  initialState,
)
