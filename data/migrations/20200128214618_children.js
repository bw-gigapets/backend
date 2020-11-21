exports.up = async function(knex) {
    await knex.schema.createTable("children", (table) => {
        table.increments()
            .unique()
        table.string("name")
            .notNullable()
        table.integer("age")
            .notNullable()
        table.integer("weight")
            .notNullable()
        table.string("weight_type")
            .notNullable()
        table.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("children")
};
