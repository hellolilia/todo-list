import React from 'react'
import { store } from '../../../../store'
import DetailTodo from '../detialTodo'

const AllTodos = () => {
  const state = store.getState()
  const todos = state.todos

  return <DetailTodo todos={todos} />
}

export default AllTodos
