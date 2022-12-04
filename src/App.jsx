import Header from "./components/Header"
import Meme from "./components/Meme"
import './App.css'

function App() {

  return (
    <div>
      <Header />
      <Meme />
    </div>
  )
}

export default App

/*
export default function App() {
  * Note: if you ever need the old value of state
  * to help you determine the new value of state,
  * you should pass a callback function to your
  * state setter function instead of using
  * state directly. This callback function will
  * receive the old value of state as its parameter,
  * which you can then use to determine your new
  * value of state.

    const [count, setCount] = React.useState(0)

    function add() {
    setCount(prevCount => prevCount + 1)
  }
*/ 