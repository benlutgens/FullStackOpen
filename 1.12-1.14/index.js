import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const rand = () => {
    return Math.floor(Math.random()*(anecdotes.length))
  }

  const randAnecdote = () => {
    let random = rand();
    while (random === selected) {
      random = rand();
    }
    setSelected(random)
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const topAnecdote = () => {
    let top = 0
    let topVotes = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > topVotes) {
        topVotes = votes[i]
        top = i
      }
    }
    return top;
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Body text1={props.anecdotes[selected]} text2={'has ' + votes[selected] + ' votes'}/>
      <div>
        <Button name="vote" handleClick= {addVote}/>
        <Button name="next anecdote" handleClick = {randAnecdote}/>
      </div>
      <Header text ="Anecdote with most votes"/>
      <Body text1 = {anecdotes[topAnecdote()]} text2 = {'has ' + votes[topAnecdote()] + ' votes'}/>
    </div>
    
  )
}

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Body = ({text1, text2}) => {
  return <>{text1}<br/>{text2}</>
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick = {handleClick}>{name}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)