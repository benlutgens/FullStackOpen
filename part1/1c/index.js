import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [counter, setCounter] = useState(0)

  const add = () => setCounter(counter + 1)
  const sub = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

  const Display = ({counter}) => <div>{counter}</div>


  return (
    <>
      <Display counter = {counter}/>
      <Button handleClick={add} text='add'/>
      <Button handleClick={sub} text='sub'/>
      <Button handleClick={zero} text='zero'/>
    </>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))

