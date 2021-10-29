import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import AddTask from './AddTask'
import { DeleteButton } from './Noria'
import Task from './Task'

const Column = (props) => {
  const DeleteColumn = (columnId, index) => {
    const columnTasks = props.board.columns[columnId].taskIds

    const finalTasks = columnTasks.reduce((prev, current) => {
      const { [current]: oldTask, ...newTasks } = prev
      return newTasks
    }, props.board.tasks)

    const columns = props.board.columns
    const { [columnId]: oldColumn, ...newColumns } = columns

    const newColumnOrder = Array.from(props.board.columnOrder)
    newColumnOrder.splice(index, 1)

    props.setBoard({
      tasks: {
        ...finalTasks,
      },
      columns: {
        ...newColumns,
      },
      columnOrder: newColumnOrder,
    })
  }

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-col w-full sm:min-w-[18rem] max-w-sm items-center pb-2 px-2 sm:px-4 py-2 border shadow-lg rounded-lg bg-white"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full text-center mb-2 hover:cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h2 className="py-2 text-3xl font-bold">{props.column.title}</h2>
              <DeleteButton
                onClick={() => DeleteColumn(props.column.id, props.index)}
              />
            </div>
            <hr className="bg-gray-300" />
          </div>
          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-2 space-y-2 w-full text-center"
              >
                {props.tasks.map((task, index) => {
                  return (
                    <Task
                      key={task.id}
                      task={task}
                      board={props.board}
                      setBoard={props.setBoard}
                      index={index}
                      columnId={props.column.id}
                    />
                  )
                })}

                {props.tasks.length < 1 && (
                  <div className="text-red-500">No tasks here (:</div>
                )}

                {provided.placeholder}

                <AddTask
                  columnId={props.column.id}
                  board={props.board}
                  setBoard={props.setBoard}
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column
