import './index.css'

const TodoItem = props => {
  const {
    todoDetails,
    deleteTodo,
    toggleComplete,
    onEdit,
    onSave,
    onChangeEditTitle,
  } = props
  const {id, title, isCompleted, isEditing, editTitle} = todoDetails

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const onToggleComplete = () => {
    toggleComplete(id)
  }

  const onClickEdit = () => {
    onEdit(id)
  }

  const onClickSave = () => {
    onSave(id)
  }

  const onEditInputChange = event => {
    onChangeEditTitle(id, event.target.value)
  }

  const titleClassName = isCompleted ? 'title completed' : 'title'

  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={isCompleted}
          onChange={onToggleComplete}
        />
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={onEditInputChange}
          />
        ) : (
          <p className={titleClassName}>{title}</p>
        )}
      </div>
      <div className="todo-actions">
        {isEditing ? (
          <button type="button" className="save-btn" onClick={onClickSave}>
            Save
          </button>
        ) : (
          <button type="button" className="edit-btn" onClick={onClickEdit}>
            Edit
          </button>
        )}
        <button type="button" className="delete-btn" onClick={onDeleteTodo}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
