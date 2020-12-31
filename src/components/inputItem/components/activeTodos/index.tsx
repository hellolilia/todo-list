import React from "react";
import { ITodoItem } from "../../index";

interface Iprops {
    todos: ITodoItem[],
    handleCheckTodo: (e: any, index: number) => void,
}

class ActiveTodos extends React.Component<Iprops,any> {
    render() {
        return (
            <p>active</p>
        )
    }
}

export default ActiveTodos