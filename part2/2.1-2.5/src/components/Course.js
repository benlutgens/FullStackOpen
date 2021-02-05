import React from 'react';

const Course = ({course}) => {
    let total = course.parts.reduce((a, c) => a + c.exercises, 0)
    return (
        <div>
            <Header name = {course.name}/>
            <Content parts = {course.parts} />
            <h4>total of {total} exercises</h4>
        </div>
    )  
}

const Header = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

export default Course