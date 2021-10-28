exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, wallet_address: '123l-jf1-835', balance: 10000 },
        { id: 2, wallet_address: '123u-5kf-dfk', balance: 20000 },
        { id: 3, wallet_address: 'afj4-dsa-lsk', balance: 30000 }
      ])
    })
}
