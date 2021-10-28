const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')

const auctionRoutes = require('./routes/auctions')
const bidRoutes = require('./routes/bids')

// Create the server
const server = express()
module.exports = server

// Configure the server
const publicFolder = path.join(__dirname, 'public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Define routes
server.use('/auctions', auctionRoutes)
server.use('/bids', bidRoutes)

server.get('/', (req, res) => {
  res.redirect('/auctions')
})
