const express = require("express")
const router = express.Router({mergeParams: true})
const checkId = require("../../middleware/check_id")

const childrenModel = require("./children-model")

// creates a child under user id
// /api/auth/users/user_id
router.post("/:id/children", checkId, async (req, res, next) => {
    try {
        console.log(req.params, "PARAMS FROM CHILDREN")
        const id = req.params.id
        const child = {
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            user_id: id
        }
        
        const newChild = await childrenModel.createChild(id, child)

        res.status(201).json({
            message: "Child has been created.",
            newChild
        })

    } catch(err) {
        next(err)
    } 
})

// edits a child
router.put("/:id/children/:name", checkId, async (req, res, next) => {
    try {
        const id = req.params.id
        const name = req.params.name
        const changes = req.body

        const child = await childrenModel.editChild(name, changes)

        res.status(201).json({
            message: "Child has been updated.",
            child
        })
    } catch(err) {
        next(err)
    } 
})

// deletes a child
router.delete("/:id/children/:name", checkId, async (req, res, status) => {
    try {
        const name = req.params.name
        const deleted = childrenModel.deleteChild(name)

        res.status(200).json({
            message: `${name} has been deleted.`
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router