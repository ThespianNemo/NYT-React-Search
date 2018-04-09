const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");

// scraping tools
// Axios, similar to jQuery's Ajax method
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
var db = require("./models/article");

const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory

app.use(bodyParser.json());
app.use(express.static("public"));

// Use apiRoutes
//app.use("/api", apiRoutes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
})

function myFunction() {
  console.log("hello");
// Matches with "/api/nyt"
app.get('/articles/:q/:begin_date/:end_date/', function(req, res){
	var ob = {
	    'api-key': "",
	    'page': '0',
	    'q': req.params.q,
	    'begin_date': req.params.begin_date
	  }

	if (req.params.end_date != 0){
		ob.end_date = req.params.end_date;
	}

	request.get({
	  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	  qs: ob,
	}, function(err, response, body) {
	  body = JSON.parse(body);
    res.json(body);
    console.log(body);
	})
})
};

/*      // Create a new Article using the `result` object built from scraping
      db.nytreact
        .create(result)
        .then(function(dbnytreact) {
          // If we were able to successfully scrape and save an Article, send a message to the client
          res.send("Scrape Complete");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
  });
});*/

// Route for getting all articles from the database
app.get("api/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.nytreact
    .find({})
    .then(function(dbnytreact) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbnytreact);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving an article to the database
app.post("api/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.nytreact
    .find({})
    .then(function(dbnytreact) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbnytreact);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for deleting an article in the database
app.post("api/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.nytreact
    .find({})
    .then(function(dbnytreact) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbnytreact);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

