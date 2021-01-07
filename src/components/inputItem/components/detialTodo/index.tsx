import { Input, List } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppAction } from '../../../../actions/app'
import { ITodoItem } from '../../../../types/app'
import { store } from '../../../../store'

interface IProps {
  todoList: ITodoItem[]
  count: number
}

const DetailTodo = (props: IProps) => {
  const { todoList, count } = props
  const dispatch = useDispatch()
  const appAction = useAppAction(dispatch)
  const state = store.getState()
  const { todos } = state

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
    const arr = todos.slice(0, todos.length)
    arr.splice(index - 1, 1)
    appAction.setTodoList(arr)
    appAction.setCount(count - 1)
  }

  const handleInputItemChange = (e: any, index: number) => {
    const arr = todos
    arr[index].label = e.target.value
    appAction.setTodoList(arr)
  }

  return (
    <List>
      {todoList.map((todo, index) => {
        return (
          <List.Item key={index} className={'todoItem'}>
            <Input
              className={'checkbox'}
              type='checkbox'
              onClick={(e) => handleCheckTodo(e, todo.id)}
              checked={todo.checked}
            />
            {todo.checked ? (
              <Input
                className={'todoDetailChecked'}
                value={todo.label}
                onChange={(e) => handleInputItemChange(e, index)}
              />
            ) : (
              <Input
                className={'todoDetail'}
                value={todo.label}
                onChange={(e) => handleInputItemChange(e, index)}
              />
            )}
            <button
              className={'deleteTodo'}
              onClick={() => {
                deleteTodo(todo.id)
              }}
            >
              X
            </button>
          </List.Item>
        )
      })}
    </List>
  )
}

export default DetailTodo
