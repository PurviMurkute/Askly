import React from 'react'
import QuestionCard from './QuestionCard'

const Content = () => {
  return (
    <div className='px-35'>
    <div className='pb-10'>
        <h1 className='text-6xl font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-400 to-green-400'>Hello, XOXO!</h1>
        <h2 className='text-4xl font-bold text-gray-300'>How can i help you?</h2>
    </div>
    <div className='flex justify-evenly space-x-1'>
        <QuestionCard question="What is the best way to learn React?" />
        <QuestionCard question="Suggest beautiful places to visit in india." />
        <QuestionCard question="What are the latest trends in web development?" />
        <QuestionCard question="List down top 5 skills that engineering students should learn in 2025." />
    </div>
    </div>
  )
}

export default Content