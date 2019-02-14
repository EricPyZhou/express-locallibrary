var express = require('express');
var router = express.Router();

/* GET emit page. */
router.get('/', function(req, res, next){
    res.render('emit'); // emit has not been defined yet!
});

module.exports = router;