exports.up = function (knex) {
  return knex.schema.createTable('auctions', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.int('current_price')
    table.string('photo_url')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('auctions')
}
