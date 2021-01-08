import { Input, List } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppAction } from '../../../../actions/app'
import { ITodoItem } from '../../../../types/app'
import { store } from '../../../../store'
import './index.css'

interface IProps {
  todo: ITodoItem
}

const DetailTodo = (props: IProps) => {
  const { todo } = props
  const dispatch = useDispatch()
  const appAction = useAppAction(dispatch)
  const state = store.getState()
  const { todos, count } = state
  const [isEdit, setIsEdit] = useState(false)
  const [doubleClick, setDoubleClick] = useState(false)

  const handleCheckTodo = (e: any, index: number) => {
    const arr = todos
    arr[index - 1].checked = !arr[index - 1].checked
    appAction.setTodoList(arr)
    const activeNumber = arr.filter((todo) => !todo.checked && !todo.deleted)
      .length
    appAction.setCount(activeNumber)
    appAction.setIsCheckedAll(activeNumber === 0)
  }

  const deleteTodo = (index: number) => {
    const arr = todos
    arr[index - 1].deleted = true
    appAction.setTodoList(arr)
    appAction.setCount(count - 1)
  }

  const handleInputItemChange = (e: any, index: number) => {
    setIsEdit(!isEdit)
    const arr = todos
    arr[index - 1].label = e.target.value
    appAction.setTodoList(arr)
  }

  const handleDoubleClick = () => {
    setDoubleClick(true)
  }

  const handleOnBlur = () => {
    setDoubleClick(false)
  }

  return (
    <List.Item className={'todoItem'}>
      <Input
        className={'checkbox'}
        type='checkbox'
        onClick={(e) => handleCheckTodo(e, todo.id)}
        checked={todo.checked}
      />
      {doubleClick ? (
        <Input
          autoFocus
          className={'todoDetail'}
          value={todo.label}
          onChange={(e) => handleInputItemChange(e, todo.id)}
          onBlur={handleOnBlur}
          onPressEnter={handleOnBlur}
        />
      ) : (
        <label className={'todoDetail'} onDoubleClick={handleDoubleClick}>
          {todo.label}
        </label>
      )}
      {!doubleClick && (
        <button
          className={'deleteTodo'}
          onClick={() => {
            deleteTodo(todo.id)
          }}
        >
          X
        </button>
      )}
    </List.Item>
  )
}

export default DetailTodo
