// import area (react)

const db = require('../models/codePalsModels');

const peopleController = {};

peopleController.getPeople = async (req,res,next) => {
    try {
    const sqlQuery = `
        SELECT *
        FROM people
    `;
    const data = await db.query(sqlQuery);
    res.locals.everyone = data.rows;
    return next();
    } catch (err) {
        next ({
            error: err
        })
    }
}

//export module
module.exports = peopleController;