import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage'
import CreateExercise from './pages/CreateExercise'
import EditExercise from './pages/EditExercise'

function App() {
  const [exercisetoEdit, setExercisetoEdit] = useState({})

  return (
    <>
    <header>
      <h1>Exercise Tracker</h1>
      <p>Track your workout sessions and trace your progression!</p>
    </header>
      <div>
       <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExercisetoEdit = {setExercisetoEdit}/>}></Route>
          <Route path="/create" element={ <CreateExercise  />}></Route>
          <Route path="/update" element={ <EditExercise exercisetoEdit={exercisetoEdit}/>}></Route>
         </Routes>
      </Router>
      </div>
      <footer>
        <p>&copy; 2025 Anvesha Kumar</p>
      </footer>
    </>
  )
}

export default App
