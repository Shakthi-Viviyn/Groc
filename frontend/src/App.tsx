import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'

function App() {

  return (
    <div className="h-[100vh] flex flex-col">
      <NavBar/>
      <Home />
    </div>
  )
}


export default App
