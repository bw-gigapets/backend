const express = require("express")
const router = express.Router({mergeParams: true})
const checkId = require("../../middleware/check_id")

const entriesModel = require("./entries-model")

// create an entry for a child
router.post("/:id/entries/:name", checkId, async (req, res, next) => {
    try {
        const id = req.params.id
        const name = req.params.name
        const entry = req.body
        const food = entry.food_name

        const [newEntry] = await entriesModel.addEntry(id, name, entry)
        const findEntry = await entriesModel.findEntryById(newEntry).first()

        res.status(201).json({
            Entry: findEntry
        })

    } catch(err) {
        next(err)
    }
})

// gets all entries for the user (not child)
router.get("/:id/entries", checkId, async (req, res, next) => {
    try {
        const entries = await entriesModel.getAllEntries(req.params.id)

        if (entries == 0) {
            res.status(400).json({
                message: "No entries could be found."
            })
        } else {
            res.status(200).json({
                message: "Retrieving entries successful!",
                entries: entries
            })
        }

    } catch(err) {
        next(err)
    }
})

// edit an entry
router.put("/:userId/entries/:name/:entryId", checkId, async (req, res, next) => {
    try {
        const entryId = req.params.entryId
        const changes = req.body
    
        const change = await entriesModel.editEntry(entryId, changes)
        const newChange = await entriesModel.findEntryById(entryId).first()

        res.status(201).json({
            newChange
        })
    } catch(err) {
        console.log(err)
        next(err)
    }
})

// deletes an entry
router.delete("/:userId/entries/:name/:entryId", checkId, async (req, res, next) => {
    try {
        const id = req.params.entryId

        const deleted = await entriesModel.deleteEntry(id)

        res.status(200).json({
            message: "Entry has been deleted."
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router