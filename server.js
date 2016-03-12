var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "week18day3";
var collections = ["books"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});



// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});



//Save to DB
app.post('/submit', function(req, res) {
  var book = req.body;
  book.read = false;
  db.books.save(book, function(err, saved) {

    if(err) {
      throw err;
    }
    console.log("it saved");
  })
  //if we want the object to have a boolean value of false, we have to do it here, because the ajax post will convert it to a string instead of a boolean
  //this is done for you below. So save the "book" object we create to your DB
  


});


//Get list of books with the field "read" marked true
app.get('/read', function(req, res) {
  db.books.find({read: true}, function(err, found) {
    if (err) {
      throw err;
    }
    res.json(found);
  })

});

//Get list of books with the field "read" marked false
app.get('/unread', function(req, res) {
  db.books.find({read: false}, function(err, found) {
    if (err) {
      throw err;
    }
    res.json(found);
  })

});


//Use the ID parameter to update the value of "read" to true
app.get('/markread/:id', function(req, res) {
  //Remember: when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))
  db.books.update({_id: mongojs.ObjectId(req.params.id) }, {$set: {read: false}}, function(err, read) {
    if(err) {
      throw err;
    } else {
      res.send(read);
    }
  });

});

//Use the ID parameter to update the value of "read" to false
app.get('/markunread/:id', function(req, res) {
  //Remember: when searching by an id, the id needs to be passed in as (mongojs.ObjectId(IDYOUWANTTOFIND))
  db.books.update({_id: mongojs.ObjectId(req.params.id) }, {$set: {read: true}}, function(err, unread) {
    if(err) {
     throw err;
  } else {
    res.send(unread);
  }
});

});



app.listen(3000, function() {
  console.log('App running on port 3000!');
});