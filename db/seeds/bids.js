exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('bids').del()
    .then(function () {
      // Inserts seed entries
      return knex('bids').insert([
        { id: 1, auction_id: 1, user_id: 1, amount: 5 },
        { id: 2, auction_id: 2, user_id: 2, amount: 3.50 },
        { id: 3, auction_id: 3, user_id: 3, amount: 2.25 },
        { id: 4, auction_id: 1, user_id: 2, amount: 10 }
      ])
    })
}
