// this middleware needs to check the ID of the user
// to make sure they can only make changes to their own account
// not other people's accounts

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const id = req.params.id || req.params.userId

    const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    console.log(req.params, "REQ")
    console.log(payload, "validated payload")

    if (payload.subject != id) {
        res.status(401).json({
            message: "You are not permited to access this page."
        })
    } else {
        next()
    }
}