import EditExerciseForm from '../components/EditExerciseForm'

function EditExercise({exercisetoEdit}) {
    return(
        <>
            <h2>Edit Exercise</h2>
            <p>Update your exercise here</p>
        <EditExerciseForm exercisetoEdit={exercisetoEdit}/>
        </>
    )
}

export default EditExercise