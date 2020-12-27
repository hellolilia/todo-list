import React from 'react';
import { Input, List } from 'antd'
import './index.css'

interface ITodoItem {
    label:string,
    checked:boolean,
}

interface isState {
    todos: ITodoItem[],
}

class InputItem extends React.Component<any,isState> {
    constructor(props:any) {
        super(props);
        this.state = {
            todos: [],
        };
    }
    handlePressEnter = (e:any) => {
        const { todos } = this.state;
        let arr = todos;
        arr.push({ label: e.target.value, checked: false});
        this.setState({ todos: arr});
    }

    render() {
        return(
            <div className={'mainInput'}>
               <Input
                   className={'input'}
                    placeholder={'What needs to be done?'}
                    onPressEnter={ e => this.handlePressEnter(e)}
                />

                <List>
                    {this.state.todos.map((todo) => {
                        return (
                                <List.Item>
                                    <label>
                                        {todo.label}
                                    </label>
                                </List.Item>
                            )
                    })}
                </List>
            </div>
        )}
}

export default InputItem