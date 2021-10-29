import React, { useState } from 'react'
import { AddButton, AddSvg, TextInput } from './Noria'

const AddTask = (props) => {
  const [data, setData] = useState({ showButton: true, content: '' })

  const handleClick = () => {
    setData((prev) => ({
      ...prev,
      showButton: !prev.showButton,
    }))
  }

  const handleTextChange = (e) => {
    setData((prev) => ({
      ...prev,
      content: e.target.value,
    }))
  }

  const addNewTask = (columnId, content) => {
    const newTaskId = 'task-' + Math.floor(Math.random() * 1000000)
    const column = props.board.columns[columnId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.push(newTaskId)

    const newTask = {
      id: newTaskId,
      content: content
    }

    props.setBoard({
      ...props.board,
      tasks: {
        ...props.board.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...props.board.columns[columnId],
          taskIds: newTaskIds
        },
      },
    })
  }

  const handleKeyPress = (e) => {
    if (data.content === '') return
    if (e.key === 'Enter') {
      setData((prev) => ({
        ...prev,
        showButton: !prev.showButton,
        content: '',
      }))
      addNewTask(props.columnId, data.content)
    }
  }

  return (
    <div>
      {data.showButton ? (
        <AddButton handleClick={handleClick}>
          <AddSvg />
          <span>Task</span>
        </AddButton>
      ) : (
        <TextInput
          value={data.content}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Task Name..."
        />
      )}
    </div>
  )
}

export default AddTask
