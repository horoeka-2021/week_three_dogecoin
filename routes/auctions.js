const express = require('express')
const router = express.Router()

const path = require('path');
module.exports = router




// GET /auctions
router.get('/', (req, res) => {
    // db.getAllAuctions()
    //   .then((auctions) => {
    //     const viewData = {
    //       auctions: auctions
    //     }
    //     res.render('showAuctions', viewData)
    //     return null
    //   })
    //   .catch(err => logError(err, res))

    res.render(path.join(__dirname, "../views/home.hbs"));
  })
