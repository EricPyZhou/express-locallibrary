var BookInstance = require('../models/bookinstance');

exports.bookinstance_list = function(req, res){
    BookInstance.find()
      .populate('book')
      .exec(function (err, list_bookinstance){
        if (err) {return next(err);}
        res.render('bookinstance_list', {title: 'Book Instance List/Inventory', bookinstance_list: list_bookinstance});
      })
};

exports.bookinstance_detail = function(req, res, next) {

        BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookinstance) {
          if (err) { return next(err); }
          if (bookinstance==null) { // No results.
              var err = new Error('Book copy not found');
              err.status = 404;
              return next(err);
            }
          // Successful, so render.
          res.render('bookinstance_detail', { title: 'Book:', bookinstance:  bookinstance});
        })
};

exports.bookinstance_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

exports.bookinstance_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: BookInstance create POST')

};

exports.bookinstance_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

exports.bookinstance_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: BookInstance delete POST')

};

exports.bookinstance_upgrade_get = function(req, res){
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

exports.bookinstance_upgrade_post = function(req, res){
    res.send('NOT IMPLEMENTED: BookInstance create POST')
};