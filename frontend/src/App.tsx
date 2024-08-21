import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'

function App() {

  return (
    <div className="h-screen flex flex-col">
      <NavBar/>
      <div className="p-5 flex-grow">
        <Home />
      </div>
    </div>
  )
}


export default App
