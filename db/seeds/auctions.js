exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      return knex('auctions').insert([
        { id: 1, name: '50c', description: '50c with rare minting error', current_price: 0.51, photo_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.6HmhK5X2qpNoDY5rvoHVjwHaHX%26pid%3DApi&f=1' },
        { id: 2, name: '5c', description: '5c no longer in circulation', current_price: 0.10, photo_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.lPeikWEMxImKEmcZH1NjHwHaHV%26pid%3DApi&f=1' },
        { id: 3, name: '$20', description: '$20 note, mint condition', current_price: 30, photo_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.6IWm9x0Ju_2fuBbSre6lbQHaDo%26pid%3DApi&f=1' }
      ])
    })
}
