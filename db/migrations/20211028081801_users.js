exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.int('balance')
    table.string('wallet_address')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
