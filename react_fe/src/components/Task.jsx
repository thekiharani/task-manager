import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { DeleteButton } from "./Noria"

const Task = (props) => {
  const deleteTask = (columnId, taskId, index) => {
    const column = props.board.columns[columnId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(index, 1)

    const tasks = props.board.tasks
    const { [taskId]: oldTask, ...newTasks } = tasks

    props.setBoard({
      ...props.board,
      tasks: {
        ...newTasks,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    })
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md hover:cursor-pointer"
        >
          <span>{props.task.content}</span>
          <DeleteButton
            onClick={() => deleteTask(props.columnId, props.task.id, props.index)}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Task
