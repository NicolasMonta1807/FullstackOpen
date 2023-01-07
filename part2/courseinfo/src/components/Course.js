import React from 'react'

const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>{name} {exercises} </p>
    </>
  )
}

const Content = ({ parts }) => {

  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
      <p>total of {total} exercises</p>
    </>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course