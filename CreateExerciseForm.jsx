import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function CreateExerciseForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [reps, setReps] = useState('')
  const [unit, setUnit] = useState('')
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState('')

  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date }
    const response = await fetch('/exercises',
      {
        method: 'POST',
        body: JSON.stringify(newExercise),
        headers: { 'Content-type': 'application/json' }
      }
    )
    if (response.status === 201) {
      alert('Successfully created exercise!')
    } else {
      alert(`Error in creating exercise, error code ${response.status}`)
    }
    navigate('/')
  }
  return (
    <div>
      <h3>Exercise Details</h3>
      
      <p>
        <input type="text" placeholder='Name' value={name}
          onChange={e => setName(e.target.value)} />

        <input type="number" placeholder='Reps' value={reps}
          onChange={e => setReps(e.target.valueAsNumber)} />

        <input type="number" placeholder='Weight' value={weight}
          onChange={e => setWeight(e.target.valueAsNumber)} />

        <select name='unit' value={unit}
          onChange={e => setUnit(e.target.value)}>
          <option id='createDefault' value='default'>Unit</option>
          <option value="lbs">lbs</option>
          <option value='kgs'>kgs</option>
        </select>

        <input type="text" placeholder='Date MM-DD-YY' value={date}
          onChange={e => setDate(e.target.value)} />
        <button onClick={addExercise}>Create</button>
      </p>
    </div>
  )
}

export default CreateExerciseForm