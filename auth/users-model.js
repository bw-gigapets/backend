const bcrypt = require("bcryptjs")
const db = require("../data/dbconfig")

// adds a user
async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    // for postgres remove the const ... = await and just explicitly return
    // for both add/edit
    return db("users").insert(user).returning("*") // you have to do it this way for postgres
}

// returns the user information [includes password]
function findById(id) {
    return db("users")
        .where({ id })
        .first()
}

// edits a user
async function editUser(id, changes) {
    if (!changes.password) {
        const username = changes.username
        const first_name = changes.first_name
        const last_name = changes.last_name
        
        return db("users").where({ id }).update(
            { username, first_name, last_name }
        ).returning("*")
    } else {
        const newPass = await bcrypt.hash(changes.password, 14)
        const username = changes.username
        const first_name = changes.first_name
        const last_name = changes.last_name
    
        return db("users").where({ id }).update(
            { username, password: newPass, first_name, last_name }
        ).returning("*")
    }
}

// deletes a user
async function deleteUser(id) {
    const user = await db("users"
        ).where({ id })
        .select("id")
        .first()

    const deleted = await db("users")
        .where({ id })
        .del()

    return id
}

// returns a user's info [in an array] using a filter parameter
function findBy(filter) {
    return db("users")
        .where(filter)
}

// returns the children [in an array] associated with the user's id
function findChildren(parentId) {
    return db("children")
        .where("user_id", parentId)
}

module.exports = {
    add,
    findById,
    editUser,
    deleteUser,
    findBy,
    findChildren
}
