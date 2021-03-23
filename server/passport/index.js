const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const fetchFromGraphQL = require('../utils/fetchFromGraphQL')

const insertSingleEstreamer = require('../graphql/mutations/InsertSingleEstreamer.graphql')
const getEStreamer = require('../graphql/queries/getEStreamer.graphql')

module.exports = function(app) {
  app.use(require('cookie-parser')())
  app.use(
    require('express-session')({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // twitter
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_SECRET_API_KEY,
        callbackURL: `${process.env.BASE_URL}/${process.env.TWITTER_CALLBACK_URL}`
      },
      function(token, tokenSecret, profile, done) {
        profile.access_token = token
        profile.token_secret = tokenSecret

        fetchFromGraphQL(getEStreamer, {
          tid: profile.id
        }).then(({ data = {} }) => {
          if (!data.estreamers_by_pk) {
            fetchFromGraphQL(insertSingleEstreamer, {
              estreamer: {
                tid: profile.id,
                access_token: profile.access_token,
                token_secret: profile.token_secret
              },
              estreamer_permissions: {
                tid: profile.id,
                retweet: true
              }
            }).then(() => {
              done(null, profile)
            })
          } else {
            done(null, profile)
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  app.get(`/${process.env.TWITTER_AUTH_URL}`, passport.authenticate('twitter'))
  app.get(
    `/${process.env.TWITTER_CALLBACK_URL}`,
    passport.authenticate('twitter', {
      failureRedirect: `/${process.env.TWITTER_AUTH_URL}`,
      successRedirect: '/'
    }) // TODO: Make an Error URL for login
  )

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
