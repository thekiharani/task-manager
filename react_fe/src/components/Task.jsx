import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="px-4 py-2 bg-gray-100 rounded-md hover:cursor-pointer"
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  )
}

export default Task
