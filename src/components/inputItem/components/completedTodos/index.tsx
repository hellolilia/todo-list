import React from 'react'
import { store } from '../../../../store'
import DetailTodo from '../detialTodo'

const CompletedTodos = () => {
  const state = store.getState()
  const todos = state.todos.filter((todo) => todo.checked && !todo.deleted)
  const count = state.count

  return <DetailTodo todoList={todos} count={count} />
}
export default CompletedTodos
