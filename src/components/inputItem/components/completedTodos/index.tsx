import React from 'react'
import { store } from '../../../../store'
import DetailTodo from '../detialTodo'
import { List } from 'antd'

const CompletedTodos = () => {
  const state = store.getState()
  const todos = state.todos.filter((todo) => todo.checked && !todo.deleted)

  return (
    <List>
      {todos.map((todo, index) => {
        return <DetailTodo todo={todo} key={index} />
      })}
    </List>
  )
}

export default CompletedTodos
