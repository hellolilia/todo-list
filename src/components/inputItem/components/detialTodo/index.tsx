import { Input, List } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppAction } from '../../../../actions/app'
import { ITodoItem } from '../../../../types/app'

interface IProps {
  todos: ITodoItem[]
}

const DetailTodo = (props: IProps) => {
  const { todos } = props
  const dispatch = useDispatch()
  const appAction = useAppAction(dispatch)

  const handleCheckTodo = (e: any, index: number) => {
    const arr = todos
    arr[index].checked = !arr[index].checked
    let total = 0
    arr.forEach((item) => {
      if (item.checked) {
        total++
      }
    })
    appAction.setTodoList(arr)
    // setCount(todos.length - total)
    // setIsCheckedAll(total === todos.length)
  }

  const deleteTodo = (index: number) => {
    const arr = todos.slice(0, todos.length)
    arr.splice(index, 1)
    appAction.setTodoList(arr)
    // setCount(count - 1)
  }

  const handleInputItemChange = (e: any, index: number) => {
    if (todos && todos.length) {
      const arr = todos
      arr[index].label = e.target.value
      appAction.setTodoList(arr)
    }
  }
  return (
    <List>
      {todos.map((todo, index) => {
        return (
          <List.Item key={index} className={'todoItem'}>
            <Input
              className={'checkbox'}
              type='checkbox'
              onClick={(e) => handleCheckTodo(e, index)}
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
                deleteTodo(index)
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
