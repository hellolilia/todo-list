import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { store } from '../../store'
import { Input } from 'antd'
import './index.css'
import AllTodos from './components/allTodos'
import ActiveTodos from './components/activeTodos'
import CompletedTodos from './components/completedTodos'

import { useAppAction } from '../../actions/app'

export const InputItem = () => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()
  const appAction = useAppAction(dispatch)
  const state = store.getState()
  const { todos, count, isCheckedAll } = state

  const handleOnChange = (e: any) => {
    setInputText(e.target.value)
  }

  const handlePressEnter = (e: any) => {
    appAction.setTodoList([...todos, { label: e.target.value, checked: false }])
    setInputText('')
    appAction.setCount(count + 1)
    console.log(todos)
  }

  const clearAll = () => {
    appAction.setTodoList([])
    setInputText('')
    appAction.setCount(0)
    appAction.setIsCheckedAll(false)
  }

  const handleCheckAll = () => {
    const arr = todos.map((item) => {
      return { label: item.label, checked: !isCheckedAll }
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
