import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isCompleted: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(todo => ({
      ...todo,
      isEditing: false,
      editTitle: '',
    })),
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  addTodo = () => {
    const {inputValue, todosList} = this.state
    const trimmed = inputValue.trim()

    if (trimmed === '') return

    const words = trimmed.split(' ')
    const lastWord = words[words.length - 1]
    const count = parseInt(lastWord, 10)

    let title = trimmed
    let numberOfTodos = 1

    if (words.length > 1 && !Number.isNaN(count) && count > 0) {
      title = words.slice(0, words.length - 1).join(' ')
      numberOfTodos = count
    }

    const maxId =
      todosList.length > 0 ? Math.max(...todosList.map(todo => todo.id)) : 0

    const newTodos = []
    for (let i = 1; i <= numberOfTodos; i += 1) {
      newTodos.push({
        id: maxId + i,
        title,
        isCompleted: false,
        isEditing: false,
        editTitle: '',
      })
    }

    this.setState({
      todosList: [...todosList, ...newTodos],
      inputValue: '',
    })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.addTodo()
    }
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  onEdit = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id
          ? {...todo, isEditing: true, editTitle: todo.title}
          : todo,
      ),
    }))
  }

  onSave = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id
          ? {...todo, title: todo.editTitle, isEditing: false, editTitle: ''}
          : todo,
      ),
    }))
  }

  onChangeEditTitle = (id, value) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, editTitle: value} : todo,
      ),
    }))
  }

  render() {
    const {todosList, inputValue} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              type="text"
              className="todo-input"
              placeholder="Enter todo (e.g. Buy groceries 3)"
              value={inputValue}
              onChange={this.onChangeInput}
              onKeyDown={this.onKeyDown}
            />
            <button type="button" className="add-btn" onClick={this.addTodo}>
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                onEdit={this.onEdit}
                onSave={this.onSave}
                onChangeEditTitle={this.onChangeEditTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
