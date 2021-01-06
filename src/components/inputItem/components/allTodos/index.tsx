import React from 'react'
import { store } from '../../../../store'
import DetailTodo from '../detialTodo'

const AllTodos = () => {
  const state = store.getState()
  const todos = state.todos.filter((todo) => !todo.deleted)
  const count = state.count

  return <DetailTodo todoList={todos} count={count} />
}

export default AllTodos
