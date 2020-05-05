const fetch = require('node-fetch')

module.exports = function(query, variables) {
  return new Promise((resolve, reject) => {
    fetch(process.env.HASURA_GRAPHQL_URL, {
      method: 'post',
      Accept: 'api_version=2',
      'Content-Type': 'application/graphql',
      body: JSON.stringify({
        query,
        variables
      }),
      headers: {
        'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          // eslint-disable-next-line
          console.log('ERROR:', data.errors)
        }
        resolve(data)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error('ERROR:', err)

        reject(err)
      })
  })
}
