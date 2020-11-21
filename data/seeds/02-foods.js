exports.seed = function(knex) {
  return knex('foods').del()
    .then(function () {
      return knex('foods').insert([
        { food_name: "Banana", category: "Fruit", amount: 1, amount_type: "whole"  },
        { food_name: "Carrot", category: "Vegetable", amount: 4, amount_type: "whole" },
        { food_name: "Bread", category: "Grains", amount: 1, amount_type: "slice" }
      ]);
    })
};
