import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function EditExerciseForm({ exercisetoEdit }) {
    const navigate = useNavigate()
    const [name, setName] = useState(exercisetoEdit.name)
    const [reps, setReps] = useState(exercisetoEdit.reps)
    const [unit, setUnit] = useState(exercisetoEdit.unit)
    const [weight, setWeight] = useState(exercisetoEdit.weight)
    const [date, setDate] = useState(exercisetoEdit.date)

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date }
        console.log(editedExercise)
        const response = await fetch(`/exercises/${exercisetoEdit._id}`,
            {
                method: 'PUT',
                body: JSON.stringify(editedExercise),
                headers: { 'Content-type': 'application/json' }
            }
        )
        if (response.status === 200) {
            alert('Exercise successfully updated!')
        } else {
            alert(`Error in updating exercise, error code ${response.status}`)
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
                    <option id='editDefault' value='default'>Unit</option>
                    <option value="lbs">lbs</option>
                    <option value='kgs'>kgs</option>
                </select>

                <input type="text" placeholder='Date' value={date}
                    onChange={e => setDate(e.target.value)} />
                <button onClick={editExercise}>Update</button>
            </p>
        </div>
    )
}

export default EditExerciseForm