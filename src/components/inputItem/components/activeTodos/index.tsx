import React from 'react'
import { store } from '../../../../store'
import DetailTodo from '../detialTodo'

const ActiveTodos = () => {
  const state = store.getState()
  const todos = state.todos.filter((todo) => !todo.checked)
  const count = state.count

  return <DetailTodo todos={todos} count={count} />
}

export default ActiveTodos
