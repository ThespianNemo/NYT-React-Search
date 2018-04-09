const router = require("express").Router();
const nytController = require("../../controllers/nytController");

// Matches with "/api/nyt"
router.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  qs: {
    'api-key': "0c3a766f98174157823d12acb90d151c",
    'q': "Mueller",
    'begin_date': "20180101",
    'end_date': "20180406",
    'page': 0
  },
}, function(err, response, body) {
  body = JSON.parse(body);
  console.log(body);
})


module.exports = router;