const express = require("express")
const router = express.Router()

const entriesModel = require("./entries-model")

// create an entry for a child
router.post("/:id/entries/:name", async (req, res, next) => {
    try {
        const id = req.params.id
        const name = req.params.name
        const entry = req.body
        const food = entry.food_name

        const newEntry = await entriesModel.addEntry(id, name, entry)

        res.status(201).json({
            newEntry
        })

    } catch(err) {
        next(err)
    }
})

// gets all entries for the user (not child)
router.get("/:id/entries", async (req, res, next) => {
    try {
        const entries = await entriesModel.getAllEntries(req.params.id)

        res.status(200).json({
            message: "Retrieving entries successful!",
            entries: entries
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router