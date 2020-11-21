exports.up = async function(knex) {
    await knex.schema.createTable("entries", (table) => {
        table.increments()
        table.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table.integer("children_id")
            .notNullable()
            .references("id")
            .inTable("children")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table.integer("food_id")
            .notNullable()
            .references("id")
            .inTable("foods")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table.integer("amount")
            .notNullable()
        table.string("amount_type")
            .notNullable()
        table.date("date")
            .notNullable()
            .default(knex.fn.now())
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("entries")
};
