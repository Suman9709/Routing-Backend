const logger = (req, res, next) => {
    //TODO: 
    //1. log timestamp
    // 2. log req.url
    //3. lod req.body
    //3. call next()
    console.log({
        Timestamp: new Date().toTimeString(),
        url: req.url,
        body: req.body
    });
    next();
}

module.exports = {
    logger,
}