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
      // unsure about how to assign this (destructure? array[0] etc)
      const viewData = auctions

      res.render('home', viewData)
      //res.render('home')
      return null
    })
    .catch(err => console.error(err))
})

// SPECIFIC AUCTION
// GET /auctions/id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  db.getAuctionById(id)
    .then(auction => {
      // unsure about data type etc
      const viewData = auction

      // res.render('auction', viewData)
      res.render('auction')
      return null
    })
    .catch(err => console.error(err))
})

// ADD BID PAGE
// GET /auctions/id/bid
router.get('/:id/bid', (req, res) => {
  const id = Number(req.params.id)

  // need to calculate if the person has already bid yet...
  // check if senders doge address is the same?

  // get bid data to set minimum bid limit
  // re-use function from /:id or make a more specific one?
  db.getAuctionById(id)
    .then(auction => {
    // unsure about data type etc
      const viewData = auction

      // res.render('bid', viewData)
      res.render('bid')
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
