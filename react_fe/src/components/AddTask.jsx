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

  const ResetData = () => {
    setData((prev) => ({
      ...prev,
      showButton: !prev.showButton,
      content: '',
    }))
  }
  

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      ResetData()
    }
    if (e.key === 'Enter') {
      if (data.content === '') return
      addNewTask(props.columnId, data.content)
      ResetData()
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      ResetData()
    }
  }

  const handleBlur = () => {
    ResetData()
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
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Task Name..."
        />
      )}
    </div>
  )
}

export default AddTask
