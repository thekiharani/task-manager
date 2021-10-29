import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import AddColumn from './AddColumn'
import Column from './Column'

const Board = (props) => {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] }

  const [board, setBoard] = useState(initialData)

  useEffect(() => {
    getBoard().then((data) => setBoard(data))
  }, [])

  useEffect(() => {
    saveBoard()
  }, [board])

  const saveBoard = async () => {
    const res = await fetch('/api/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(board)
    })

    const data = await res.json()
    console.log(data);
  }

  const getBoard = async () => {
    const res = await fetch('/api/board')
    const data = await res.json()
    console.log(data)
    return data.board
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    if (type === 'column') {
      const newColumOrder = Array.from(board.columnOrder)
      newColumOrder.splice(source.index, 1)
      newColumOrder.splice(destination.index, 0, draggableId)
      setBoard((prev) => ({
        ...prev,
        columnOrder: newColumOrder,
      }))

      return
    }

    const start = board.columns[source.droppableId]
    const finish = board.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      setBoard((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }))

      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(source.index, 0, draggableId)

    const newFinishColumn = {
      ...finish,
      taskIds: finishTaskIds,
    }

    setBoard((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    }))

    return
  }

  return (
    <div className="">
      <div className="w-full sm:w-72 my-4">
        <AddColumn board={board} setBoard={setBoard} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col sm:flex-row flex-wrap gap-4 bg-gray-100 px-2 sm:px-8 py-6 rounded-xl w-full"
            >
              {board.columnOrder.map((columnId, index) => {
                const column = board.columns[columnId]
                const tasks = column.taskIds.map(
                  (taskIds) => board.tasks[taskIds]
                )
                return (
                  <Column
                    board={board}
                    setBoard={setBoard}
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                )
              })}

              {board.columnOrder.length < 1 && (
                <div className="text-red-500">No boards here (:</div>
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board
