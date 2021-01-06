import React from 'react'
import { store } from '../../../../store'
import DetailTodo from '../detialTodo'

const AllTodos = () => {
  const state = store.getState()
  const todos = state.todos
  const count = state.count

  return <DetailTodo todos={todos} count={count} />
}

export default AllTodos
