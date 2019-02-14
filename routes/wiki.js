var express = require('express');
var router = express.Router();
const file_path = __dirname + '\\fortest.pdf';

router.get('/',function(req, res, next){
    res.send('WIKI home page');
});

router.get('/ab+out/:ID', function(req, res, next){
    res.send('about wiki, ID is ' + req.params.ID * 2);
});

router.get('/download', function(req, res, next){
    res.sendFile(file_path);
}); 

module.exports = router;