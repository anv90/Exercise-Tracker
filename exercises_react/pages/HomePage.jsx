import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ExerciseTable from '../components/ExerciseTable'

function HomePage({ setExercisetoEdit }) {
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = async (exercisetoEdit) => {
        setExercisetoEdit(exercisetoEdit);
        console.log(exercisetoEdit)
        navigate("/update");
    }

    return (
        <div>
            <h2>Exercise History</h2>
            <p>See all your completed exercises here</p>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
            <button id='createButton' onClick={e => {
                e.preventDefault()
                navigate('/create')
            }}>Create Exercise</button>
        </div>
    )
}

export default HomePage