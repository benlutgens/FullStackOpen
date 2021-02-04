import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div id = "Feedback">
        <Header name = "give feedback" />
        <Button name = "good" handleClick = {() => setGood(good + 1)}/>
        <Button name = "neutral" handleClick = {() => setNeutral(neutral + 1)}/>
        <Button name = "bad" handleClick = {() => setBad(bad + 1)}/>
      </div>
      <div id = "Statistics">
      <Header name = "statistics" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
      
      </div>
    </>
  )
}

const Statistics = ({good, bad, neutral}) => {
  
    const average = () => {
    if (total() === 0) return 0
    return (good-bad)/total()
  }

  const positive = () => {
    if (total() === 0) return 0
    return (good/(good+bad+neutral))*100 + "%"
  }

  const total = () => {
    return good+bad+neutral
  }

  if (good+bad+neutral === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <Statistic name="good" value={good}/>
      <Statistic name="neutral" value={neutral}/>
      <Statistic name="bad" value={bad}/>
      <Statistic name="total" value={total()}/>
      <Statistic name="average" value={average()}/>
      <Statistic name="positive" value={positive()}/>
    </table>
  )
}

const Header = ({name}) => {
  return <h1>{name}</h1>
}

const Statistic = ({name, value}) => {
  return <tr><td>{name}</td><td>{value}</td></tr>
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick = {handleClick}>{name}</button>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
