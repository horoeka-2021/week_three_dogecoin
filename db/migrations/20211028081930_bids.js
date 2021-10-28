exports.up = function (knex) {
  return knex.schema.createTable('bids', (table) => {
    table.increments('id').primary()
    table.int('auction_id').references('auctions.id')
    table.int('user_id').references('users.id')
    table.int('amount')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('bids')
}
