const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('SOUE47GRA7', '27837c65b49224e74e20d5aea458a409');
const index = client.initIndex('amazonclonev1');



router.get('/', (req, res, next) => {
  if (req.query.query) {
    index.search({
      query: req.query.query,
      page: req.query.page,
    }, (err, content) => {
      res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: req.query.query
      });
    });
  }
});


module.exports = router;

