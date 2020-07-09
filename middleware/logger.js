log = (req, res, next) => {
    console.log('Logging details of User...');
    next();
}

module.exports = log;