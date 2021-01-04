import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

import { Input, List } from 'antd'
import './index.css'
import AllTodos from './components/allTodos'
import ActiveTodos from './components/activeTodos'
import CompletedTodos from './components/completedTodos'

import { RootState } from '../../reducers/state'
import { appAction, useAppAction } from '../../actions/app'

export const InputItem = () => {
  const [inputText, setInputText] = useState('')
  const [count, setCount] = useState(0)
  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const dispatch = useDispatch()
  const appAction = useAppAction(dispatch)
  const { todos } = useSelector(({ appInfo }: RootState) => ({
    ...appInfo,
  }))
  console.log(todos)

  const handleOnChange = (e: any) => {
    setInputText(e.target.value)
  }

  const handleInputItemChange = (e: any, index: number) => {
    if (todos && todos.length) {
      const arr = todos
      arr[index].label = e.target.value
      appAction.setTodoList(arr)
    }
  }

  const handlePressEnter = (e: any) => {
    // todos
    //   ? appAction.setTodoList([
    //       ...todos,
    //       {
    //         label: e.target.value,
    //         checked: false,
    //       },
    //     ])
    //   :
    appAction.setTodoList({ label: e.target.value, checked: false })
    setInputText('')
    setCount(count + 1)
    console.log(todos)
  }

  const clearAll = () => {
    appAction.setTodoList([])
    setInputText('')
    setCount(0)
    setIsCheckedAll(false)
  }

  const handleCheckAll = () => {
    const arr = todos.map((item) => {
      return { label: item.label, checked: !isCheckedAll }
    })
    appAction.setTodoList(arr)
    setInputText('')
    setCount(isCheckedAll ? todos.length : 0)
    setIsCheckedAll(!isCheckedAll)
  }

  const handleCheckTodo = (e: any, index: number) => {
    const arr = todos
    arr[index].checked = !arr[index].checked
    let total = 0
    arr.forEach((item) => {
      if (item.checked) {
        total++
      }
    })
    appAction.setTodoList(arr)
    setCount(todos.length - total)
    setIsCheckedAll(total === todos.length)
  }

  const deleteTodo = (index: number) => {
    const arr = todos.slice(0, todos.length)
    arr.splice(index, 1)
    appAction.setTodoList(arr)
    setCount(count - 1)
  }

  return (
    <Router>
      <div className={'mainInput'}>
        <div className={'inputItem'}>
          {todos && todos.length !== 0 ? (
            <Input
              className='checkAll'
              type='checkbox'
              onClick={handleCheckAll}
              checked={isCheckedAll}
            />
          ) : null}
          <Input
            className={'input'}
            value={inputText}
            placeholder={'What needs to be done?'}
            onChange={(e) => handleOnChange(e)}
            onPressEnter={(e) => handlePressEnter(e)}
          />
        </div>
        {/*<List>*/}
        {/*  {todos.map((todo, index) => {*/}
        {/*    return (*/}
        {/*      <List.Item key={index} className={'todoItem'}>*/}
        {/*        <Input*/}
        {/*          className={'checkbox'}*/}
        {/*          type='checkbox'*/}
        {/*          onClick={(e) => handleCheckTodo(e, index)}*/}
        {/*          checked={todo.checked}*/}
        {/*        />*/}
        {/*        {todo.checked ? (*/}
        {/*          <Input*/}
        {/*            className={'todoDetailChecked'}*/}
        {/*            value={todo.label}*/}
        {/*            onChange={(e) => handleInputItemChange(e, index)}*/}
        {/*          />*/}
        {/*        ) : (*/}
        {/*          <Input*/}
        {/*            className={'todoDetail'}*/}
        {/*            value={todo.label}*/}
        {/*            onChange={(e) => handleInputItemChange(e, index)}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*        <button*/}
        {/*          className={'deleteTodo'}*/}
        {/*          onClick={() => {*/}
        {/*            deleteTodo(index)*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          X*/}
        {/*        </button>*/}
        {/*      </List.Item>*/}
        {/*    )*/}
        {/*  })}*/}
        {/*</List>*/}
        <Switch>
          <Route exact path='/' component={AllTodos} />
          <Route path='/Active' component={ActiveTodos} />
          <Route path='/Complete' component={CompletedTodos} />
        </Switch>
        {todos && todos.length !== 0 ? (
          <div>
            <div className={'bottomBorderOne'}>
              <p>{count} items left</p>
              <Link to='/'>All</Link>
              <Link to='/Active'>Active</Link>
              <Link to='/Complete'>Complete</Link>
              <p onClick={clearAll}>Clear All</p>
            </div>
            <div className={'bottomBorderTwo'} />
            <div className={'bottomBorderThree'} />
          </div>
        ) : null}
      </div>
    </Router>
  )
}
