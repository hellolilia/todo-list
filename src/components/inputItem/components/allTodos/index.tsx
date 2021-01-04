import React from 'react'
import { ITodoItem } from '../../../../types/app'

interface Iprops {
  todos: ITodoItem[]
  handleCheckTodo: (e: any, index: number) => void
}

class AllTodos extends React.Component<Iprops, any> {
  render() {
    return <p>all</p>
  }
}

export default AllTodos
