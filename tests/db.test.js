const knex = require('knex')
const config = require('../db/knexfile').test
const testDb = knex(config)

const db = require('../db/index')

beforeAll(() => {
  return testDb.migrate.latest({ directory: './db/migrations' })
})

beforeEach(() => {
  return testDb.seed.run({ directory: './db/seeds' })
})


test('Should return the correct number of Auctions', () => {
  return db.getAllAuctions(testDb)
    .then(auctions => {
      expect(auctions).toHaveLength(3)
      return null
    })
})

test('getAuctionById should return the correct name', () => {
  const id = 1
  return db.getAuctionById(id, testDb)
    .then(auction => {
      expect(auction.auctionName).toMatch('50c')
      return null
    })
})

test('Should return the correct number of bids for an auction', () => {
  const auctionId = 1
  return db.getBidsByAuction(auctionId, testDb)
    .then(bids => {
      expect(bids).toHaveLength(2)
      expect(bids[0].bidAmount).toBe(5)
      return null
    })
})

test('Should create a new bid', () => {
  const newBid = { id: 5, auction_id: 1, user_id: 1, amount: 15 }

  return db.placeBid(newBid, testDb)
    .then(() => db.getBidsByAuction(newBid['auction_id'], testDb))
    .then(bids => {
      expect(bids).toHaveLength(2)
      expect(bids[1].bidAmount).toBe(15)
      return null
    })
})
