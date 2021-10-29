import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import AddTask from './AddTask'
import Task from './Task'

const Column = (props) => {
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
            <h2 className="py-2 text-3xl font-bold">{props.column.title}</h2>
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
