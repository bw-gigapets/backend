exports.seed = function(knex) {
  return knex('entries').del()
    .then(function () {
      return knex('entries').insert([
        { user_id: 1, children_id: 1, food_id: 2, amount: 3, amount_type: "whole", date: "January 29, 2020" }
      ]);
    });
};
