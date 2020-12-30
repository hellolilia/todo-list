import React from 'react'
import { Input, List } from 'antd'
import './index.css'

interface ITodoItem {
    label:string,
    checked:boolean,
}

interface isState {
    todos: ITodoItem[],
    count: number,
    inputText: string,
    isCheckedAll: boolean,
}

class InputItem extends React.Component<any,isState> {
    constructor(props:any) {
        super(props)
        this.state = {
            todos: [],
            count: 0,
            inputText: '',
            isCheckedAll: false,
        }
    }

    handleOnChange = (e:any) => {
        this.setState({ inputText: e.target.value })
    }

    handleInputItemChange = (e:any, index:number) => {
        const { todos } = this.state
        if (todos && todos.length) {
            let arr = todos
            arr[index].label = e.target.value
            this.setState({ todos: arr })
        }
    }

    handlePressEnter = (e:any) => {
        const { todos, count } = this.state
        let arr = todos
        arr.push({ label: e.target.value, checked: false})
        this.setState({ todos: arr, count: count + 1, inputText: ''})
    }

    clearAll = () => {
        this.setState({ todos: [], count: 0, isCheckedAll: false })
    }

    handleCheckAll = () => {
        const { isCheckedAll, todos } = this.state
        const arr = todos.map((item) => {
            return { label: item.label, checked: !isCheckedAll }
        })
        this.setState({ todos: arr, isCheckedAll: !isCheckedAll, count: isCheckedAll ? todos.length : 0 })
    }

    handleCheckTodo = (e:any, index:number) => {
        const { todos } = this.state
        let arr = todos
        arr[index].checked = !arr[index].checked
        let total = 0
        arr.forEach(item =>{
            if(item.checked) {
                total++
            }
        })
        this.setState({ todos: arr, isCheckedAll: total === todos.length, count: todos.length - total })
    }

    deleteTodo = (index:number) => {
        const { todos, count } = this.state
        let arr = todos.slice(0, todos.length)
        arr.splice(index, 1)
        this.setState({ todos: arr, count: count - 1})
    }

    render() {
        const { todos, count, isCheckedAll, inputText } = this.state
        return(
            <div className={'mainInput'}>
                <div className={'inputItem'}>
                    {todos.length !== 0 ? <Input
                        className='checkAll'
                        type='checkbox'
                        onClick={this.handleCheckAll}
                        checked={isCheckedAll}
                    /> : null}
                    <Input
                        className={'input'}
                        value={inputText}
                        placeholder={'What needs to be done?'}
                        onChange={e => this.handleOnChange(e)}
                        onPressEnter={ e => this.handlePressEnter(e)}
                    />
                </div>
                <List>
                    {todos.map((todo,index) => {
                        return (
                                <List.Item key={index} className={'todoItem'}>
                                    <Input
                                        className={'checkbox'}
                                        type='checkbox'
                                        onClick={e => this.handleCheckTodo(e, index)}
                                        checked={todo.checked}
                                    />
                                    {todo.checked ? <Input
                                        className={'todoDetailChecked'}
                                        value={todo.label}
                                        onChange={e => this.handleInputItemChange(e, index)}
                                    /> : <Input
                                        className={'todoDetail'}
                                        value={todo.label}
                                        onChange={e => this.handleInputItemChange(e, index)}
                                    />}
                                    <button
                                        className={'deleteTodo'}
                                        onClick={() => {this.deleteTodo(index)}}
                                    >
                                        X
                                    </button>
                                </List.Item>
                            )

                    })}
                </List>
                {todos.length !== 0 ? <div>
                    <div className={'bottomBorderOne'}>
                        <p>
                            {count} items left
                        </p>
                        <p onClick={this.clearAll}>Clear All</p>
                    </div>
                    <div className={'bottomBorderTwo'}/>
                    <div className={'bottomBorderThree'}/>
                </div> : null }
            </div>
        )}
}

export default InputItem