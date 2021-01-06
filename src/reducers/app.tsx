import { ITodoItem } from '../types/app'
import { Action, handleActions } from 'redux-actions'
import { AppActionType } from '../actions/app'

export interface AppState {
  todos: ITodoItem[]
  count: number
  isCheckedAll: boolean
}

const initialState: AppState = {
  todos: [],
  count: 0,
  isCheckedAll: false,
}

export const appReducer = handleActions<AppState, any>(
  {
    [AppActionType.setTodoList]: (
      state: AppState,
      action: Action<ITodoItem[]>,
    ) => {
      return {
        ...state,
        todos: action.payload,
      }
    },
    [AppActionType.setCount]: (state: AppState, action: Action<number>) => {
      return {
        ...state,
        count: action.payload,
      }
    },
    [AppActionType.setIsCheckedAll]: (
      state: AppState,
      action: Action<boolean>,
    ) => {
      return {
        ...state,
        isCheckedAll: action.payload,
      }
    },
  },
  initialState,
)
