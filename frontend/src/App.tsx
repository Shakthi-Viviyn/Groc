import './App.css'
import 'react-toastify/dist/ReactToastify.min.css';
import LoginScreen from './pages/LoginScreen'
import SignUpScreen from './pages/SignUpScreen'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomeScreen from './pages/HomeScreen'



function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<HomeScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/signUp" element={<SignUpScreen/>}/>
        </Route>
      </Routes>
  )
}


export default App
