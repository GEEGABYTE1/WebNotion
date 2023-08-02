var axios = require('axios');
var express = require('express');
var router = express.Router();
router.get('/page/:page_id', function (req, res) {
    var user_page_id = req.params['page_id'];
    console.log("User page Id: ", user_page_id);
});
module.exports = router;
//# sourceMappingURL=notion.js.map