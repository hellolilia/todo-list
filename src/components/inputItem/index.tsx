import React from 'react';
import { Input, List } from 'antd'
import './index.css'

interface ITodoItem {
    label:string,
    checked:boolean,
}

interface isState {
    todos: ITodoItem[],
    count: number,
}

class InputItem extends React.Component<any,isState> {
    constructor(props:any) {
        super(props);
        this.state = {
            todos: [],
            count: 0,
        };
    }

    handlePressEnter = (e:any) => {
        const { todos, count } = this.state;
        let arr = todos;
        arr.push({ label: e.target.value, checked: false});
        this.setState({ todos: arr, count: count + 1  });
    }

    clearAll = () => {
        this.setState({ todos: [], count: 0 });
    };

    render() {
        return(
            <div className={'mainInput'}>
               <Input
                   className={'input'}
                    placeholder={'What needs to be done?'}
                    onPressEnter={ e => this.handlePressEnter(e)}
                />

                <List>
                    {this.state.todos.map((todo,index) => {
                        return (
                                <List.Item key={index} className={'todoItem'}>
                                    <label>
                                        {todo.label}
                                    </label>
                                </List.Item>
                            )

                    })}
                </List>
                <p>
                    {this.state.count} items left
                </p>
                <p onClick={this.clearAll}>Clear All</p>
            </div>
        )}
}

export default InputItem