exports.up = async function(knex) {
    await knex.schema.createTable("foods", (table) => {
        table.increments()
            .unique()
        table.string("food_name")
            .notNullable()
            .unique()
        table.string("category")
            .notNullable()
        table.integer("amount")
            .notNullable()
            .defaultTo(0)
        table.string("amount_type")
            .notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("foods")
};
