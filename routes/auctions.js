const express = require('express')
const router = express.Router()

const path = require('path');
module.exports = router

const db = require('../db/index')

// HOME PAGE EFFECTIVELY
// GET /auctions/
router.get('/', (req, res) => {
  db.getAllAuctions()
    .then(auctions => {
      console.log(auctions)
      res.render('home', { auctions })
      return null
    })
    .catch(err => console.error(err))
})

// SPECIFIC AUCTION
// GET /auctions/id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  const viewData = {}

  db.getAuctionById(id)
    .then(auction => {
      viewData.auction = auction
      return db.getBidsByAuction(id)
    })
    .then(bids => {
      viewData.bids = bids
      res.render('auction', viewData)
      return null
    })
    .catch(err => console.error(err))
})

// ADD BID PAGE
// GET /auctions/id/bid
router.get('/:id/bid', (req, res) => {
  const id = Number(req.params.id)

  const viewData = {}

  db.getAuctionById(id)
    .then(auction => {
      viewData.auction = auction
      return db.getBidsByAuction(id)
    })
    .then(bids => {
      viewData.bids = bids
      res.render('bid', viewData)
      return null
    })
    .catch(err => console.error(err))
})

// ADD BID POST ROUTE
router.get('/:id/bid', (req, res) => {
  const id = Number(req.params.id)

  // get bid info from form
  const bid = req.body

  // TODO make this line work?
  const newUser = req.body.user

  const viewData = {}

  // need to calculate if the person has already bid yet...
  // check if senders doge address is the same?

  // check if user is a new user and if so add them to user database
  // first get all users to search through
  db.getUsers()
    .then(users => {
      if (user_does_not_exist) {
        return db.addUser
      } else {
        return db.placeBid
      }
    })
    .then(() => {
      // if user is not there
      db.addUser(newUser)
    })
    .then(() => {
      db.placeBid(bid)
    })
    .catch(err => console.error(err))
})
