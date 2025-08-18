/**
 * Anvesha Kumar
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQUEST = {Error: "Invalid Request"};
/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/

function isValidDate(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isValidNumber(num) {
    return num > 0;
}

function isValidUnit(unit) {
    if (unit === 'kgs' || unit === 'lbs') {
        return true;
    }
    return false;
}


function isValidRequest(body) {
    if (isValidDate(body.date) && isValidNumber(body.reps) 
        && isValidNumber(body.weight) && isValidUnit(body.unit)) {
        return true;
    } 
    return false;
}
/**
 * Create a new exercise with the query parameters provided in the body
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    if (isValidRequest(req.body)) {
        const exercise = await exercises.createExercise(req.body.name, 
                        req.body.reps, 
                        req.body.weight,
                        req.body.unit,
                        req.body.date);
        res.status(201).json(exercise);
    } else {
        res.status(400).json(ERROR_INVALID_REQUEST);
    }   
}));

 app.get('/exercises', asyncHandler(async (req, res) => {
    const exerciseArray = await exercises.readExercises()
    res.status(200).json(exerciseArray)
    
}))

app.get('/exercises/:id', asyncHandler(async(req, res) => {
    const exercise = await exercises.readExercisebyID(req.params.id)
    if (exercise.length === 1) { //if readexercisebyID returned an object
      res.status(200).json(exercise[0])
    } else {
      res.status(404).json(ERROR_NOT_FOUND)
    }
}))

app.put('/exercises/:id', asyncHandler(async(req, res) => {
    if(isValidRequest(req.body)) {
        const exercise = await exercises.updateExercisebyID(req.params.id, req.body)
        if (exercise) {
            res.status(200).json(exercise)
        } else {
            res.status(404).json(ERROR_NOT_FOUND)
        }
    } else {
        res.status(400).json(ERROR_INVALID_REQUEST)
    }
    
}))

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
     const obj = await exercises.deleteExercisebyID(req.params.id)
      if (obj.deletedCount === 1) {
        res.status(204).send()
      } else {
        res.status(404).json(ERROR_NOT_FOUND)
      }
}))