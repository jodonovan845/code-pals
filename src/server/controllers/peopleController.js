// import area (react)

const db = require('../models/codePalsModels');

const peopleController = {};

peopleController.getPeople = async (req,res,next) => {
    try {
        // GETTING ALL PEOPLE FROM DATABASE    
        const sqlQuery = `
            SELECT *
            FROM people
        `;
        const data = await db.query(sqlQuery);
        res.locals.everyone = data.rows;
        return next();
    } catch (err) {
        next ({
            log: `Error in peopleController.getPeople. Details: ${err}`,
            message: { err: 'An error occurred in peopleController.getPeople' },
        })
    }
}

peopleController.addPerson = async (req,res,next) => {
    try {
        // GETTING INFO FROM REQUEST BODY
        const name = req.body.name;
        // INSERTING NEW DOCUMENT INTO PEOPLE TABLE
        const sqlQuery = `
        INSERT INTO people (person_id, name, points)
        VALUES (DEFAULT, $1, 0);
        `
        const arrayOfBody = [name]
        await db.query(sqlQuery, arrayOfBody);

        // GETTING ID FROM NAME I JUST INSERTED AND SAVING IT TO RES.LOCALS.ID
        const sqlQueryAgain = `
            SELECT person_id FROM "people"
            WHERE name=$1
        `
        const data = await db.query(sqlQueryAgain, arrayOfBody);
        console.log('I WANT TO BRING BACK THE ID: ', data.rows[0].person_id)
        res.locals.id = data.rows[0].person_id;
        return next();
        // ERROR HANDLING
        } catch (err) {
            next ({
                log: `Error in peopleController.addPerson. Details: ${err}`,
                message: { err: 'An error occurred in peopleController.addPerson' },
            })
        }
}

peopleController.upScore = async (req,res,next) => {
    try {
        // GETTING CURRENT SCORE AND INCREMENTING
        const person_id = req.params.id;
        const sqlQuery1 = `
        SELECT points FROM people 
        WHERE person_id = $1
        `;
        const pointsQueryArray = [person_id];
        const result = await db.query(sqlQuery1, pointsQueryArray);
        let currentPoints = ++result.rows[0].points;

        // UPDATING SCORE IN DB
        const sqlQuery2 = `
        UPDATE people
        SET points = $2
        WHERE person_id = $1
        `;
        const updateScoreQueryArray = [person_id, currentPoints]
        await db.query(sqlQuery2, updateScoreQueryArray);
        return next();

        //ERROR HANDLING
        } catch (err) {
            next ({
                log: `Error in peopleController.upScore. Details: ${err}`,
                message: { err: 'An error occurred in peopleController.upScore' },
            })
        }
}

peopleController.downScore = async (req,res,next) => {
    try {
        // GETTING CURRENT SCORE AND DECREMENTING
        const person_id = req.params.id;
        const sqlQuery1 = `
        SELECT points FROM people 
        WHERE person_id = $1
        `;
        const pointsQueryArray = [person_id];
        const result = await db.query(sqlQuery1, pointsQueryArray);
        let currentPoints = --result.rows[0].points;

        // UPDATING SCORE IN DB
        const sqlQuery2 = `
        UPDATE people
        SET points = $2
        WHERE person_id = $1
        `;
        const updateScoreQueryArray = [person_id, currentPoints]
        await db.query(sqlQuery2, updateScoreQueryArray);
        return next();

        // ERROR HANDLING
        } catch (err) {
            next ({
                log: `Error in peopleController.downScore. Details: ${err}`,
                message: { err: 'An error occurred in peopleController.downScore' },
            })
        }
}

peopleController.deletePerson = async (req,res,next) => {
    try {
        // GETTING ID OF PERSON
        const person_id = req.params.id;
        console.log('THIS IS THE ID I AM GOING TO DELETE', person_id)
        
        // DELETING PERSON
        const sqlQuery2 = `
        DELETE FROM people
        WHERE person_id=$1
        `;
        const updateScoreQueryArray = [person_id]
        await db.query(sqlQuery2, updateScoreQueryArray);
        return next();
        // ERROR HANDLING
        } catch (err) {
            next ({
                log: `Error in peopleController.deletePerson. Details: ${err}`,
                message: { err: 'An error occurred in peopleController.deletePerson' },
            })
        }
}

//export module
module.exports = peopleController;