import { createAction } from 'redux-actions'
import { Dispatch, bindActionCreators } from 'redux'

export enum AppActionType {
  setTodoList = 'SET_TODO_LIST',
}

export const appAction = {
  setTodoList: createAction(AppActionType.setTodoList),
}

export const useAppAction = (dispatch: Dispatch) => {
  return bindActionCreators(appAction as any, dispatch)
}
