var Author = require('../models/author');
var async = require('async');
var Book = require('../models/book');
const{ body, validationResult} = require('express-validator/check');
const{ sanitizeBody } = require('express-validator/filter');


exports.author_list = function(req, res){
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec(function(err, list_authors){
            if(err) {return next(err);}
            res.render('author_list', {title: 'Author List', author_list: list_authors});
        });
};

exports.author_detail = function(req, res){
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });
};

exports.author_create_get = function(req, res){
    res.render('author_form',{title: 'Create Author'});
};

exports.author_create_post = [
    body('first_name').isLength({min: 1}).trim().withMessage('First name must be specified')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({min: 1}).trim().withMessage('Family name must be specified')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({checkFalsy: true}).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({checkFalsy: true}).isISO8601(),

    // trim character(by default: white spaces) at the beginning/end of the input
    // replace special characters with corresponding HTML entities.
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render('author_form', {title: 'Create Author', author: req.body, errors: errors.array()});
            return;
        }else{
            var author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            
            author.save(function (err){
                if (err) {return next(err);}

                res.redirect(author.url);
            });
        }
    }

]

exports.author_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: Author delete GET');
};

exports.author_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: Author delete POST')

};

exports.author_upgrade_get = function(req, res){
    res.send('NOT IMPLEMENTED: Author create GET');
};

exports.author_upgrade_post = function(req, res){
    res.send('NOT IMPLEMENTED: Author create POST')
};