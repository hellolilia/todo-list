import { Input, List } from 'antd'
import React from 'react'
import { store } from '../../../../store'

const AllTodos = () => {
  const state = store.getState()
  const todos = state.todos
  return (
    <List>
      {todos.map((todo, index) => {
        return (
          <List.Item key={index} className={'todoItem'}>
            <Input
              className={'checkbox'}
              type='checkbox'
              // onClick={(e) => handleCheckTodo(e, index)}
              checked={todo.checked}
            />
            {todo.checked ? (
              <Input
                className={'todoDetailChecked'}
                value={todo.label}
                // onChange={(e) => handleInputItemChange(e, index)}
              />
            ) : (
              <Input
                className={'todoDetail'}
                value={todo.label}
                // onChange={(e) => handleInputItemChange(e, index)}
              />
            )}
            <button
              className={'deleteTodo'}
              // onClick={() => {
              //   deleteTodo(index)
              // }}
            >
              X
            </button>
          </List.Item>
        )
      })}
    </List>
  )
}

export default AllTodos
