var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');

const{ body, validationResult } = require('express-validator/check');
const{ sanitizeBody } = require('express-validator/filter');



exports.genre_list = function(req, res){
   Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genre){
        if (err) {return next(err)};

        res.render('genre_list', {title : 'Genre List', genre_list : list_genre});
    });
};

exports.genre_detail = function(req, res){
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
                .exec(callback)
        },

        genre_books: function(callback){
            Book.find({'genre': req.params.id})
                .exec(callback)
        },
    }, function(err, results){
        if (err) {return next(err)};

        if(results.genre == null){
            var error = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        res.render('genre_detail', {title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books});

    });
};

exports.genre_create_get = function(req, res){
    res.render('genre_form', { title: 'Create Genre' });
};

// need '[]'
//
exports.genre_create_post =[body('thisname', 'Invalid Genre name').isLength({min: 2}).trim(),
                            sanitizeBody('thisname').trim().escape(),
                            (req, res, next) => {
                                const errors = validationResult(req);
                                
                                // name of the input field --- 'thisname'
                                var genre = new Genre({name: req.body.thisname});
                                
                                if (!errors.isEmpty()){
                                    res.render('genre_form', {title:'Create Genre', genre:genre, errors: errors.array()});
                                    return;
                                }else{
                                    Genre.findOne({'name': req.body.thisname})
                                    .exec( function(err, found_genre){
                                        if (err) {return next(err);}

                                        if (found_genre){
                                            console.log('find');
                                            // this found_genre should be a founded instance
                                            res.redirect(found_genre.url);
                                        }else{
                                            genre.save(function(err){
                                                if (err) {return next(err);}
                                                
                                                res.redirect(genre.url);
                                            });
                                        }
                                    });
                                }
}];

exports.genre_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

exports.genre_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: Genre delete POST')

};

exports.genre_upgrade_get = function(req, res){
    res.send('NOT IMPLEMENTED: Genre create GET');
};

exports.genre_upgrade_post = function(req, res){
    res.send('NOT IMPLEMENTED: Genre create POST')
};