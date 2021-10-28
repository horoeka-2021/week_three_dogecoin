const express = require('express')
const router = express.Router()
module.exports = router

const db = require('../db/index')

// GET /auctions/
router.get('/', (req, res) => {
  db.getAuctions()
    .then(auctions => {
      // unsure about how to assign this (destructure? array[0] etc)
      const viewData = auctions

      // res.render('home', viewData)
      res.render('home')
    })
})

