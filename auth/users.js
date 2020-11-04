const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const restricted = require("../middleware/restricted")
const checkId = require("../middleware/check_id")
const generateToken = require("./token")
const usersModel = require("./users-model")
const entries = require("./children/entries")
const children = require("./children/children")

// creates a new user
router.post("/register", async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (req.body.password.length < 6) {
            return res.status(400).json({
                message: "Password must contain 6 or more characters."
            })
        } else if(!username || !password) {
            return res.status(400).json({
                message: "Both a username and a password are required."
            })
        }else {
            const added = await usersModel.add(req.body)
            const user = await usersModel.findBy({username})
            user[0].password = undefined


    
            res.status(201).json({
                message: "User has been created",
                newUser: user
            })
        }
    } catch(err) {
        next(err)
    }
})

// logs-in a user
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await usersModel.findBy({ username }).first()
        const verifyPassword = await bcrypt.compare(password, user.password)

        if (user && verifyPassword) {
            const token = await generateToken(user)

            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            })
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            })
        }
    } catch(err) {
        next(err)
    }
})

// gets user information [children included]
router.get("/users/:id", restricted, checkId, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await usersModel.findById(id)
        const data = await usersModel.findChildren(id)
        
        if (!user) {
            res.status(401).json({
                message: `There is no user with id: ${id}`
            })
        } else {
            res.status(200).json({
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                children: data // returns an array of children
            })
        }
        
    } catch(err) {
        console.log("Unable to log you in...")
        next(err)
    }
})

// edit a user
router.put("/users/:id", restricted, checkId, async (req, res, next) => {
    try {
        const changes = req.body
        const id = req.params.id

        if (changes.password && changes.password.length < 6) {
            res.status(401).json({
                message: "Password length must be 6 or more characters."
            })
        } else {
            const edited = await usersModel.editUser(id, changes)
            const updatedUser = await usersModel.findById(id)
            console.log(updatedUser, "FIND BY ID")
            updatedUser.password = undefined

            res.status(201).json({
                message: "User has been updated.",
                changes: updatedUser
            })
        }
    } catch(err) {
        next(err)
    }
})

// deletes a user
router.delete("/users/:id", restricted, checkId, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await usersModel.findById(id)
        const deleted = await usersModel.deleteUser(id)
        console.log(user)

        if (!user) {
            res.status(401).json({
                message: `There is no user with id: ${id}`
            })
        } else {
            if (!deleted) {
                res.status(401).json({
                    message: "User could not be deleted."
                })
            } else if (deleted) {
                res.status(200).json({
                    message: `User ${id} has been deleted.`
                })
            }
        }
    } catch(err) {
        next(err)
    }
})

// not necessary, but if you want to use it...
// sends a logout message when the user logs out
router.get("/users/logout", restricted, async (req, res, next) => {
    try {
        res.status(200).json({
            message: "You have been logged out."
        })
    } catch(err) {
        next(err)
    }
})

router.use("/users", restricted, entries)
router.use("/users", restricted, children)

module.exports = router