const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')

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

// const [directory] = require('./routes/[file].js')
// server.use('/[directory]', [directory])

server.get('/', (req, res) => {
  const viewData = { }
  res.render('home', viewData)
})
