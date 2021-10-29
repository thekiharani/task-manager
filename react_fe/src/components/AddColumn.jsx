import React, { useState } from 'react'
import { AddButton, AddSvg, TextInput } from './Noria'

const AddColumn = (props) => {
  const [data, setData] = useState({ showButton: true, title: '' })

  const handleClick = () => {
    setData((prev) => ({
      ...prev,
      showButton: !prev.showButton,
    }))
  }

  const handleTextChange = (e) => {
    setData((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }

  const addNewColumn = (title) => {
    const newColumnOrder = Array.from(props.board.columnOrder)
    const newColumnId = 'column-' + Math.floor(Math.random() * 1000000)
    newColumnOrder.push(newColumnId)

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    }

    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: newColumnOrder,
    })
  }

  const ResetData = () => {
    setData((prev) => ({
      ...prev,
      showButton: !prev.showButton,
      title: '',
    }))
  }

  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.keyCode === 2) {
      ResetData()
    }

    if (e.key === 'Enter') {
      if (data.title === '') return
      addNewColumn(data.title)
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
    <div onKeyDown={handleKeyDown}>
      {data.showButton ? (
        <AddButton handleClick={handleClick}>
          <AddSvg />
          <span>Board</span>
        </AddButton>
      ) : (
        <TextInput
          value={data.title}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          placeholder="Column Name..."
        />
      )}
    </div>
  )
}

export default AddColumn
