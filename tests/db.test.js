const knex = require('knex')
const config = require('../db/knexfile').test
const testDb = knex(config)

const db = require('./db')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getCars should return the correct length', () => {
  return db.getCars(testDb)
    .then(cars => {
      expect(cars).toHaveLength(5)
      return null
    })
})

test('it should create a new car in the table', () => {
  const newCar = { owner_id: 5, slot: 10, plate_number: 'test', year: '2018', make: 'test car' }

  return db.createCar(newCar, testDb)
    .then(() => db.getCars(testDb))
    .then(cars => {
      expect(cars).toHaveLength(6)
      return null
    })
})
