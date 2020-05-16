const Twitter = require('twitter')
const fetchFromGraphQL = require('../utils/fetchFromGraphQL')

const updateSinglePermission = require('../graphql/mutations/UpdateSinglePermission.graphql')
const getPermissions = require('../graphql/queries/getPermissions.graphql')

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_API_KEY,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
})

module.exports = function(app) {
  app.post('/api/change-permission', (req, res) => {
    if (req.user) {
      fetchFromGraphQL(updateSinglePermission, {
        tid: req.user.id,
        permissions: req.body.permissions
      }).then(() => {
        res.json({ ok: true })
      })
    } else {
      res.json({ ok: false })
    }
  })

  app.get('/api/get-permissions', (req, res) => {
    if (req.user) {
      fetchFromGraphQL(getPermissions, {
        tid: req.user.id
      }).then(({ data }) => {
        res.json(data.permissions_by_pk)
      })
    } else {
      res.json({ ok: false })
    }
  })

  app.get('/api/get-tweets', (req, res) => {
    twitterClient.get(
      `search/tweets`,
      { q: '#EStreamerCoders -filter:retweets', tweet_mode: 'extended' },
      function(error, tweets, response) {
        if (error) return res.json({ error })
        res.json(tweets.statuses)
      }
    )
  })
}
