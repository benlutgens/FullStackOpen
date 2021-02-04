import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundmentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  } 
  

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]}/>
      <Part part = {props.parts[2]}/>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part.name}</p>
      <p>{props.part.exercises}</p>
    </>
  )
}

const Total = (props) => {
  var total = 0
  props.parts.forEach(value => {
    total += value.exercises
  })
  return (
    <p>{total}</p>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
