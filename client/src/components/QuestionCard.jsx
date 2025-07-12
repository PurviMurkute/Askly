import React from 'react'

const QuestionCard = ({ question }) => {
  return (
        <div className='bg-gray-600 py-10 px-5 rounded-lg shadow-lg w-[270px] cursor-pointer hover:scale-95 transition-transform duration-300'>
            <p className='text-gray-300 font-medium'>{question}</p>
        </div>
  )
}

export default QuestionCard