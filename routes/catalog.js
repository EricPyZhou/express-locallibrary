var express = require('express');
var router = express.Router();

var book_controller = require('../Controllers/bookController');
var author_controller = require('../Controllers/authorController');
var genre_controller = require('../Controllers/genreController');
var book_instance_controller = require('../Controllers/bookinstanceController');


router.get('/',book_controller.index);

//BOOK

//idea here is to use a GET route for the initial display of the form and a POST route to
//the same path for handling validation and processing of form data.
router.get('/book/create',book_controller.book_create_get);

router.post('/book/create',book_controller.book_create_post);



router.get('/book/:id/delete',book_controller.book_delete_get);

router.post('/book/:id/delete',book_controller.book_delete_post);



router.get('/book/:id/update',book_controller.book_upgrade_get);

router.post('/book/:id/update',book_controller.book_upgrade_post);



router.get('/book/:id',book_controller.book_detail);



router.get('/books?',book_controller.book_list);


//AUTHOR

router.get('/author/create',author_controller.author_create_get);

router.post('/author/create',author_controller.author_create_post);



router.get('/author/:id/delete',author_controller.author_delete_get);

router.post('/author/:id/delete',author_controller.author_delete_post);



router.get('/author/:id/update',author_controller.author_upgrade_get);

router.post('/author/:id/update',author_controller.author_upgrade_post);



router.get('/author/:id',author_controller.author_detail);



router.get('/authors?',author_controller.author_list);

//GENRE ROUTES

router.get('/genre/create',genre_controller.genre_create_get);

router.post('/genre/create',genre_controller.genre_create_post);



router.get('/genre/:id/delete',genre_controller.genre_delete_get);

router.post('/genre/:id/delete',genre_controller.genre_delete_post);



router.get('/genre/:id/update',genre_controller.genre_upgrade_get);

router.post('/genre/:id/update',genre_controller.genre_upgrade_post);


router.get('/genre/:id',genre_controller.genre_detail);

router.get('/genres?', genre_controller.genre_list);

//BOOKINSTANCE ROUTES

router.get('/bookinstance/create',book_instance_controller.bookinstance_create_get);

router.post('/bookinstance/create',book_instance_controller.bookinstance_create_post);



router.get('/bookinstance/:id/delete',book_instance_controller.bookinstance_delete_get);

router.post('/bookinstance/:id/delete',book_instance_controller.bookinstance_delete_post);


router.get('/bookinstance/:id/update',book_instance_controller.bookinstance_upgrade_get);

router.post('/bookinstance/:id/update',book_instance_controller.bookinstance_upgrade_post);


router.get('/bookinstance/:id',book_instance_controller.bookinstance_detail);

router.get('/bookinstances?',book_instance_controller.bookinstance_list);


module.exports = router;
