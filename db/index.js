const config = require('./knexfile').development
const database = require('knex')(config)

module.exports = {
  getAllAuctions,
  getAuctionById,
  placeBid,
  increaseBid,
  getUsers,
  addUser,
  getBidsByAuction
}

function getAllAuctions (db = database) {
  return db('auctions')
    .select('id as id',
      'name as name',
      'current_price as currentPrice',
      'description as description',
      'photo_url as photoUrl')
}

function getAuctionById (id, db = database) {
  return db('auctions')
    .where('id', id)
    .select('auctions.id as id',
      'auctions.name as auctionName',
      'auctions.current_price as currentPrice',
      'auctions.description as description',
      'auctions.photo_url as photoUrl'
  )
    .first()
}

// Will need to get all existing bids related to auction to check if a bid is high enough

function getBidsByAuction (id, db = database) {
  return db('bids')
    .join('users', 'bids.user_id', 'users.id')
    .where('auction_id', id)
    .select('bids.amount as bidAmount',
      'users.wallet_address as walletAddress')
}

function placeBid (newBid, db = database) {
  return db('bids')
    .insert({
      auction_id: newBid.auction_id,
      user_id: newBid.user_id,
      amount: newBid.amount
    })
}

function increaseBid (updatedBid, db = database) {
  return db('bids')
    .where('id', updatedBid.id)
    .update({
      amount: updatedBid.amount
    })
}

function getUsers (db = database) {
  return ('users')
    .select()
}

function addUser (newUser, db = database) {
  return db('users')
    .insert({
      wallet_address: newUser.wallet_address
    })
}
