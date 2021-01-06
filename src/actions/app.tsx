import { createAction } from 'redux-actions'
import { Dispatch, bindActionCreators } from 'redux'

export enum AppActionType {
  setTodoList = 'SET_TODO_LIST',
  setCount = 'SET_COUNT',
  setIsCheckedAll = 'SET_IS_CHECKED_ALL',
}

export const appActions = {
  setTodoList: createAction(AppActionType.setTodoList),
  setCount: createAction(AppActionType.setCount),
  setIsCheckedAll: createAction(AppActionType.setIsCheckedAll),
}

export const useAppAction = (dispatch: Dispatch) => {
  return bindActionCreators(appActions as any, dispatch)
}
