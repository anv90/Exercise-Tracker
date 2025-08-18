/**
 * Anvesha Kumar
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_CLASS = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_CLASS});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Define the schema
 */
const ExerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true }
});


/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model(EXERCISE_CLASS, ExerciseSchema);


/**
 * Create a Exercise
 * @param {String} name
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

const readExercises = async (filter) => {
    const query = Exercise.find(filter)
    return query.exec()
}

const readExercisebyID = async (id) => {
    const query = Exercise.find({_id: id})
    return query.exec()

}

const updateExercisebyID = async (id, update) => {
    return Exercise.findOneAndUpdate({_id: id}, {$set:update}, {new: true})
}


const deleteExercisebyID = async (id) => {
    return Exercise.deleteOne({_id: id})
}


export { connect, createExercise, readExercises, 
         readExercisebyID, updateExercisebyID, deleteExercisebyID };