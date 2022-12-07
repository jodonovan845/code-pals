// import area (react)

const peopleController = {};

peopleController.addPerson = (req,res,next) => {
    console.log('hello')
    res.locals.test = 'testing';
    return next();
}

//export module
module.exports = peopleController;