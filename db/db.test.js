const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./index')

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

test('getAuctionById should return the correct length', () => {
  const id = 1
  return db.getAuctionById(id, testDb)
    .then(auction => {
      expect(auction).toHaveLength(1)
      expect(auction.name).toMatch('50c')
      return null
    })
})

test('Should return the correct number of bids for an auction', () => {
  const auctionId = 1
  return db.getBidsByAuction(auctionId, testDb)
    .then(bids => {
      expect(bids).toHaveLength(2)
      expect(bids[0].amount).toBe(5)
      return null
    })
})

test('Should create a new bid', () => {
  const newBid = { id: 5, auction_id: 1, user_id: 1, amount: 15 }

  return db.placeBid(newBid, testDb)
    .then(() => db.getBids(testDb))
    .then(bids => {
      expect(bids).toHaveLength(3)
      expect(bids[2].amount).toBe(15)
      return null
    })
})

// test('Should increase a bid', () => {
//     const newBid = {  }
  
//     return db.increaseBid(updateBid, testDb)
//       const bid = 5
//       .then(() => db.getBids(bid, testDb))
//       .then(bids => {
//         expect(bids).toHaveLength(4)
//         return null
//       })
//   })

test('Should return the correct number of users', () => {
  return db.getUsers(testDb)
    .then(users => {
      expect(users).toHaveLength(3)
      return null
    })
})

test('Should create a new user', () => {
  const newUser = { id: 4, wallet_address: '12k3-asd-123', balance: 40000 }

  return db.addUser(newUser, testDb)
    .then(() => db.getUsers(testDb))
    .then(users => {
      expect(users).toHaveLength(4)
      expect(users[3]['wallet_address']).toMatch('afj4-dsa-lsk')
      return null
    })
})
