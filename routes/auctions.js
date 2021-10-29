const express = require('express')
const router = express.Router()

const path = require('path')
module.exports = router

const db = require('../db/index')

// HOME PAGE EFFECTIVELY
// GET /auctions/
router.get('/', (req, res) => {
  db.getAllAuctions()
    .then(auctions => {
      console.log('auctions: ', auctions)
      res.render('home', { auctions })
      return null
    })
    .catch(err => console.error(err))
})

// SPECIFIC AUCTION
// GET /auctions/id

// ADD BID PAGE
// GET /auctions/id/bid
router.get('/:id/bid', (req, res) => {
  const id = Number(req.params.id)

  const viewData = {}

  // render bid page with min bid variable

  db.getAuctionById(id)
    .then(auction => {
      viewData.auction = auction
      return db.getBidsByAuction(id)
    })
    .then(bids => {
      viewData.userId = bids[0].userId
      viewData.bids = bids
      console.log('TCL: viewData.bids', viewData)
      res.render('bid', viewData)
      return null
    })
    .catch(err => console.error(err))
})

// ADD BID POST ROUTE
router.post('/bid', (req, res) => {
  // const id = Number(req.params.id)

  // get bid info from form
  const bid = req.body
  console.log(bid)

  db.getAuctionById(bid.auctionId)
    .then(auction => {
      if (auction.currentPrice < bid.amount) {
        return db.updateAuction(auction.id, bid.amount)
          .then(auction => {
            return db.placeBid(bid)
          })
          .then(bids => {
            res.redirect(`/auctions/${auction.id}`)
            return null
          })
          .catch(err => console.error(err))
      } else {
        res.redirect(`/auctions/${auction.id}`)
        return null
      }
    })
    .catch(err => console.error(err))

  // TODO make this line work?
  // const newUser = req.body.user

  // const viewData = {}

  // need to calculate if the person has already bid yet...
  // check if senders doge address is the same?

  // check if user is a new user and if so add them to user database
  // first get all users to search through
})

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
      console.log(bids)
      res.render('auction', viewData)
      return null
    })
    .catch(err => console.error(err))
})
