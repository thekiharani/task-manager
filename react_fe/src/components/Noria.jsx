import React from 'react'

export const AddButton = ({
  handleClick,
  children,
  className = 'bg-blue-600',
}) => {
  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center space-x-2 w-full text-gray-50 px-4 py-1.5 rounded-lg ${className}`}
    >
      {children}
    </button>
  )
}

export const TextInput = ({
  value,
  onChange,
  onKeyPress = () => {},
  onKeyDown = () => {},
  onBlur = () => {},
  placeholder = '',
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className="border-1 border-gray-300 rounded-sm focus:border-blue-400 focus:ring-0"
      placeholder={placeholder}
      autoFocus
    />
  )
}

export const AddSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-red-600 text-gray-50 p-0.5 rounded-full" title="Delete">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}
