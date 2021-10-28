const express = require('express')
const router = express.Router()
module.exports = router

const db = require('../db/index')

// HOME PAGE EFFECTIVELY
// GET /auctions/
router.get('/', (req, res) => {
  db.getAuctions()
    .then(auctions => {
      // unsure about how to assign this (destructure? array[0] etc)
      const viewData = auctions

      // res.render('home', viewData)
      res.render('home')
      return null
    })
    .catch(err => console.error(err))
})

// SPECIFIC AUCTION
// GET /auctions/id
router.get('/id', (req, res) => {
  
})