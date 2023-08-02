const axios = require('axios')
var express = require('express')
const router = express.Router()


router.get('/page/:page_id', (req, res) => {
    const user_page_id: string = req.params['page_id']
    console.log("User page Id: ", user_page_id)
})



module.exports = router