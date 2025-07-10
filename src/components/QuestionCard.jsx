import React from 'react'

const QuestionCard = ({ question }) => {
  return (
        <div className='bg-gray-200 py-10 px-5 rounded-lg shadow-lg w-[270px] cursor-pointer hover:shadow-xl transition-shadow duration-300'>
            <p className='text-gray-500 font-medium'>{question}</p>
        </div>
  )
}

export default QuestionCard