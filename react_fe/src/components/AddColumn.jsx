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
      columnOrder: newColumnOrder
    })
  }

  const handleKeyPress = (e) => {
    if (data.title === '') return
    if (e.key === 'Enter') {
      setData((prev) => ({
        ...prev,
        showButton: !prev.showButton,
        title: '',
      }))
      addNewColumn(data.title)
    }
  }
  return (
    <div>
      {data.showButton ? (
        <AddButton handleClick={handleClick}>
          <AddSvg />
          <span>Column</span>
        </AddButton>
      ) : (
        <TextInput
          value={data.title}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Column Name..."
        />
      )}
    </div>
  )
}

export default AddColumn
