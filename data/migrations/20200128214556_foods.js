exports.up = async function(knex) {
    await knex.schema.createTable("foods", (table) => {
        table.increments()
            .unique()
        table.string("food_name")
            .notNullable()
            .unique()
        table.string("category")
            .notNullable()
        table.integer("food_weight")
            .notNullable()
            .defaultTo(0)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("foods")
};
