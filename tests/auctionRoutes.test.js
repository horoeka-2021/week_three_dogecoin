const request = require('supertest')
const server = require('../server')

test ('/ GET returns correct response', (done) => {
  request(server)
  .get('/auctions')
  .expect(200)
  .end((err, res) => {
    expect(err).toBeNull()
    done()
  })
})

test ('/auctions GET returns correct response', (done) => {
  request(server)
  .get('/auctions')
  .expect(200)
  .end((err, res) => {
    expect(err).toBeNull()
    expect(res.text).toMatch('rare minting error')    
    done()
  })
})

test ('/auctions/1 GET returns correct response', (done) => {
  request(server)
  .get('/auctions/1')
  .expect(200)
  .end((err, res) => {
    expect(err).toBeNull()
    expect(res.text).toMatch('rare minting error')
    done()
  })
})

test ('/auctions/1/bid GET returns correct response', (done) => {
  request(server)
  .get('/auctions/1/bid')
  .expect(200)
  .end((err, res) => {
    expect(err).toBeNull() 
    expect(res.text).toMatch('add a bid')
    
    done()
  })
})