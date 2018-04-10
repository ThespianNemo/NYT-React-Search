const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();
const request = require("request");
// const apiRoutes = require("./routes/apiRoutes.js");
const mongojs = require("mongojs");
app.use(logger("dev"));
app.use(bodyParser());

// const scraper = require("./utils/api.js");


// Database configuration
const databaseUrl = process.env.MONGODB_URI || "nytreact_db";
const collections = ["articles"];

// Hook mongojs config to db variable
const db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function (error) {
  console.log("Database Error:", error);
});

//allow the api to be accessed by other apps
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.get('/articles/:q/:begin_date/:end_date/', function (req, res) {
  var ob = {
    'api-key': "0c3a766f98174157823d12acb90d151c",
    'page': '0',
    'q': req.params.q,
    'begin_date': req.params.begin_date
  }

  if (req.params.end_date != 0) {
    ob.end_date = req.params.end_date;
  }

  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: ob,
  }, function (err, response, body) {
    body = JSON.parse(body);
    res.json(body);
  })
})

//Route to get all articles
app.get('/articles', function (req, res) {
  db.articles.find({}, function (error, result) {
    res.json(result);
  });
});

app.put('/article/:id', function (req, res) {
  db.articles.findAndModify({
    query: {
      "_id": mongojs.ObjectId(req.params.id)
    },
    update: {
      $set: {
        "name": req.body.name
      }
    },
    new: true
  }, function (err, editedArticle) {
    res.json(editedArticle);
  });
});

  //route to save an article
  app.post('/savedArticle', function (req, res) {
    db.articles.insert(req.body, function (error, savedArticle) {
      // Log any errors
      if (error) {
        res.send(error);
      } else {
        res.json(savedArticle);
      }
    });
  });

  //route to delete a saved story
  app.delete('/delete/:id', function (req, res) {
    var article_id = req.params.id;

    db.articles.remove({
      "_id": mongojs.ObjectID(article_id)
    }, function (error, removed) {
      if (error) {
        res.send(error);
      } else {
        res.json(article_id);
      }
    });

  });

  app.get('/articles/:q/:begin_date/:end_date/', function (req, res) {
    var ob = {
      'api-key': "bc5f77268f204de5bdbc933ba1f5c699",
      'page': '0',
      'q': req.params.q,
      'begin_date': req.params.begin_date
    }

    if (req.params.end_date != 0) {
      ob.end_date = req.params.end_date;
    }

    request.get({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: ob,
    }, function (err, response, body) {
      body = JSON.parse(body);
      res.json(body);
    })
  })



  // // Listen on port 3001
  app.listen(PORT, function () {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });