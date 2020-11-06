module.exports = (req, res, next) => {
    if (!req.headers.Authorization) {
        res.status(401).json({
            message: "You are not logged in!"
        })
    } else {
        next()
    }
}