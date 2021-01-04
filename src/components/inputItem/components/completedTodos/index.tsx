import React from 'react'
import { ITodoItem } from '../../../../types/app'

interface Iprops {
  todos: ITodoItem[]
  handleCheckTodo: (e: any, index: number) => void
}

class CompletedTodos extends React.Component<Iprops, any> {
  render() {
    return <p>completed</p>
  }
}

export default CompletedTodos
