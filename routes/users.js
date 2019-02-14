var express = require('express');
var router = express.Router(); // middleware in Express

/* GET users listing.
   Since 'app.use('/users'...) is defined,
   to access all 'users.js' related stuff.
   '/users' would be added into URL Pattern first
   then all '/ ...' we defined in get function
   can be access through '/users/ ...[things we defined]'
*/
router.get('/', function(req, res, next) {
  res.render('index', {title: 'danmuku'});
});

router.get('/cool',function(req, res, next){
  res.send('VERY COOL!');
});

module.exports = router;
