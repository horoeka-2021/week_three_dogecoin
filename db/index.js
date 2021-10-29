const config = require('./knexfile').development
const database = require('knex')(config)

module.exports = {
  getAllAuctions,
  getAuctionById,
  placeBid,
  increaseBid,
  getUsers,
  addUser,
  getBidsByAuction,
  updateAuction
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
    .select('bids.id as bidId',
      'bids.amount as bidAmount',
      'users.wallet_address as walletAddress',
      'users.id as userId')
}

function placeBid (newBid, db = database) {
  return db('bids')
    .insert({
      auction_id: newBid.auctionId,
      user_id: newBid.userId,
      amount: newBid.amount
    })
}

function updateAuction (id, amount, db = database) {
  return db('auctions')
    .where('id', id)
    .update({
      current_price: amount
    })
}

function increaseBid (updatedBid, db = database) {
  return db('bids')
    .where('id', updatedBid.bidId)
    .update({
      amount: updatedBid.amount
    })
}

