import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { Button, Input } from 'antd'
import { store } from '../../store'
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
  const countTodos = todos.filter((todo) => !todo.deleted).length

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
        ...item,
        checked: !isCheckedAll,
      }
    })
    appAction.setTodoList(arr)
    setInputText('')
    appAction.setCount(
      isCheckedAll ? todos.filter((todo) => !todo.deleted).length : 0,
    )
    appAction.setIsCheckedAll(!isCheckedAll)
  }

  return (
    <Router>
      <div className={'mainInput'}>
        <div className={'inputItem'}>
          {countTodos !== 0 ? (
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
        {countTodos !== 0 ? (
          <div>
            <Switch>
              <Route exact path='/' component={AllTodos} />
              <Route path='/Active' component={ActiveTodos} />
              <Route path='/Complete' component={CompletedTodos} />
            </Switch>
            <div className={'bottomBorderOne'}>
              <div className={'countItems'}>
                {count === 1 ? (
                  <p>{count} item left</p>
                ) : (
                  <p>{count} items left</p>
                )}
              </div>
              <div className={'filters'}>
                <Link to='/'>All</Link>
                <Link to='/Active'>Active</Link>
                <Link to='/Complete'>Complete</Link>
              </div>
              <div className={'completed'}>
                {todos.filter((todo) => todo.checked && !todo.deleted)
                  .length === 0 ? null : (
                  <Button
                    onClick={clearCompleted}
                    className={'completedButton'}
                  >
                    Clear completed
                  </Button>
                )}
              </div>
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
