import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { store } from '../../store'
import { Input } from 'antd'
import './index.css'
import AllTodos from './components/allTodos'
import ActiveTodos from './components/activeTodos'
import CompletedTodos from './components/completedTodos'

import { useAppAction } from '../../actions/app'

const InputItem = () => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()
  const appAction = useAppAction(dispatch)
  const state = store.getState()
  const { todos, count, isCheckedAll } = state

  const handleOnChange = (e: any) => {
    setInputText(e.target.value)
  }

  const handlePressEnter = (e: any) => {
    appAction.setTodoList([
      ...todos,
      {
        label: e.target.value,
        checked: false,
        id: todos.length + 1,
        deleted: false,
      },
    ])
    setInputText('')
    appAction.setCount(count + 1)
  }

  const clearCompleted = () => {
    const completedTodos = todos.map((item) => {
      if (item.checked) {
        return {
          label: item.label,
          checked: false,
          id: item.id,
          deleted: true,
        }
      }
      return item
    })
    appAction.setTodoList(completedTodos)
    setInputText('')
    appAction.setCount(completedTodos.filter((todo) => !todo.deleted).length)
    appAction.setIsCheckedAll(false)
  }

  const handleCheckAll = () => {
    const arr = todos.map((item) => {
      return {
        label: item.label,
        checked: !isCheckedAll,
        id: item.id,
        deleted: false,
      }
    })
    appAction.setTodoList(arr)
    setInputText('')
    appAction.setCount(isCheckedAll ? todos.length : 0)
    appAction.setIsCheckedAll(!isCheckedAll)
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
        {todos && todos.length !== 0 ? (
          <div>
            <Switch>
              <Route exact path='/' component={AllTodos} />
              <Route path='/Active' component={ActiveTodos} />
              <Route path='/Complete' component={CompletedTodos} />
            </Switch>
            <div className={'bottomBorderOne'}>
              <p>{count} items left</p>
              <Link to='/'>All</Link>
              <Link to='/Active'>Active</Link>
              <Link to='/Complete'>Complete</Link>
              <p onClick={clearCompleted}>Clear completed</p>
            </div>
            <div className={'bottomBorderTwo'} />
            <div className={'bottomBorderThree'} />
          </div>
        ) : null}
      </div>
    </Router>
  )
}

export default connect((state) => state)(InputItem)
