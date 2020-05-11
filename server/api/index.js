const Twitter = require('twitter')
const getBearerToken = require('get-twitter-bearer-token')
const fetchFromGraphQL = require('../utils/fetchFromGraphQL')

const updateSinglePermission = require('../graphql/mutations/UpdateSinglePermission.graphql')
const getPermissions = require('../graphql/queries/getPermissions.graphql')

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
    getBearerToken(
      process.env.TWITTER_API_KEY,
      process.env.TWITTER_SECRET_API_KEY,
      (error, response) => {
        if (error) {
          res.json({ error })
        } else {
          const client = new Twitter({
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_SECRET_API_KEY,
            bearer_token: response.body.access_token
          })
          client.get(`search/tweets`, { q: '#EStreamerCoders' }, function(
            error,
            tweets,
            response
          ) {
            if (error) return res.json({ error })
            const tweetsResponse = tweets.statuses.filter((tweet) => {
              return !tweet.retweeted_status
            })
            res.json(tweetsResponse)
          })
        }
      }
    )
  })
}
