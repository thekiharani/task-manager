import React from 'react'

export const AddButton = ({ handleClick, children,  className='bg-blue-600' }) => {
  return (
    <button onClick={handleClick}
      className={`flex justify-center items-center space-x-2 w-full text-gray-50 px-4 py-1.5 rounded-lg ${className}`}
    >
      {children}
    </button>
  )
}

export const TextInput = ({ value, onChange, onKeyPress = null, placeholder = '' }) => {
  return (
    <input type="text" value={value} onChange={onChange} onKeyPress={onKeyPress} className="border-1 border-gray-300 rounded-sm focus:border-blue-400 focus:ring-0" placeholder={placeholder} />
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