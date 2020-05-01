const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const fetch = require('node-fetch')

module.exports = function(app) {
  app.use(require('cookie-parser')())
  app.use(
    require('express-session')({
      secret: 'io samuel',
      resave: true,
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
        return done(null, profile)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  app.get('/retweeter/auth', passport.authenticate('twitter'))
  app.get(
    '/retweeter/callback',
    passport.authenticate('twitter', { failureRedirect: '/retweeter/auth' }),
    (req, res) => {
      const query = `
        mutation {
          insert_estreamers_one(
            object: {
              id: "${req.user.id}",
              name: "${req.user.displayName}",
              photo: "${req.user.photos[0].value}",
              username: "${req.user.username}",
              access_token: "${req.user.access_token}",
              token_secret: "${req.user.token_secret}"
            }
          ) {
            id
            username
          }
        }
      `
      fetch(process.env.HASURA_GRAPHQL_URL, {
        method: 'post',
        Accept: 'api_version=2',
        'Content-Type': 'application/graphql',
        body: JSON.stringify({ query }),
        headers: {
          'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
        }
      })
        .then((res) => res.json())
        .then((data) => {
          // eslint-disable-next-line
          console.log(data)
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error('Error:', err)
        })
      res.redirect('/')
    }
  )

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
